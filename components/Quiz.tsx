import React, { useState, useEffect } from 'react';
import { MedicalSubject, ExamStream } from '../types';
import { fetchMCQsForSubject } from '../services/mcqService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MCQQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  wasSkipped?: boolean;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Challenge';
type QuizMode = 'review' | 'test';

interface QuizProps {
  subject: MedicalSubject;
  topic?: string;
  stream: ExamStream;
  onClose: () => void;
  onReviewNotes: () => void;
  onExitToDashboard: () => void;
  onUpdateStats: (subject: MedicalSubject, correct: number, incorrect: number, difficulty?: string) => void;
}

// ---------------------------------------------------------------------------
// Inline SVG Icon helpers (mirrors the production bundle which used raw SVGs
// rather than lucide-react for this component)
// ---------------------------------------------------------------------------

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Quiz: React.FC<QuizProps> = ({
  subject,
  topic,
  stream,
  onClose,
  onReviewNotes,
  onExitToDashboard,
  onUpdateStats,
}) => {
  // ---- State ----
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [skippedQuestions, setSkippedQuestions] = useState<MCQQuestion[]>([]);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>('review');
  const [testAnswers, setTestAnswers] = useState<Map<number, number>>(new Map());
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // ---- Challenge mode countdown timer ----
  useEffect(() => {
    if (difficulty === 'Challenge' && timeRemaining !== null && !isQuizComplete) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            setIsQuizComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [difficulty, timeRemaining, isQuizComplete]);

  // ---- Helpers ----

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /** Handle the "back" / close button depending on current quiz state. */
  const handleBack = () => {
    // If currently reviewing answers one-by-one, go back to summary
    if (isReviewingAnswers) {
      setIsReviewingAnswers(false);
      setCurrentIndex(0);
      return;
    }

    // If a difficulty was chosen or quiz is complete, reset to difficulty selection
    if (difficulty || isQuizComplete) {
      setDifficulty(null);
      setIsQuizComplete(false);
      setCorrectCount(0);
      setCurrentIndex(0);
      setTestAnswers(new Map());
      setSkippedQuestions([]);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      // No quiz started yet -- offer review-notes prompt
      setShowReviewPrompt(true);
    }
  };

  /** Load MCQ questions for the selected difficulty. */
  const loadQuestions = async (diff: Difficulty) => {
    setDifficulty(diff);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setIsLoading(true);

    let count = 15;
    if (diff === 'Medium') count = 10;
    if (diff === 'Hard') count = 5;
    if (diff === 'Challenge') count = 100;

    try {
      const mcqs = await fetchMCQsForSubject(subject, count, stream, topic, diff);
      setQuestions(mcqs);
      setSkippedQuestions([]);

      if (diff === 'Challenge') {
        setTimeRemaining(mcqs.length * 60); // 1 minute per question
        setQuizMode('test');
      } else {
        setTimeRemaining(null);
      }
    } catch (err) {
      console.error('Failed to load MCQs', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** Select an answer option. */
  const handleSelectAnswer = (index: number) => {
    if (quizMode === 'review') {
      // In review mode, can't change answer after reveal
      if (isAnswerRevealed) return;
      setSelectedAnswer(index);
    } else {
      setSelectedAnswer(index);
    }
  };

  /** Reveal the correct answer (review mode only). */
  const handleCheckAnswer = () => {
    if (selectedAnswer !== null && quizMode === 'review') {
      setIsAnswerRevealed(true);
      if (selectedAnswer === questions[currentIndex].correctAnswerIndex) {
        setCorrectCount((prev) => prev + 1);
      }
    }
  };

  /** Skip the current question to revisit later. */
  const handleSkipQuestion = () => {
    if (currentIndex >= questions.length) return;
    const current = questions[currentIndex];
    setSkippedQuestions((prev) => [...prev, current]);
    handleNextQuestion(true);
  };

  /** Advance to the next question or finish the quiz. */
  const handleNextQuestion = (isSkipping = false) => {
    // In test mode, record the answer for the current question
    if (quizMode === 'test' && !isSkipping && selectedAnswer !== null) {
      setTestAnswers((prev) => new Map(prev).set(currentIndex, selectedAnswer));
      if (selectedAnswer === questions[currentIndex].correctAnswerIndex) {
        setCorrectCount((prev) => prev + 1);
      }
    }

    if (currentIndex < questions.length - 1) {
      // More questions remain
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      // End of question list -- handle skipped questions
      if (skippedQuestions.length > 0 || (isSkipping && skippedQuestions.length >= 0)) {
        let pending = [...skippedQuestions];
        if (isSkipping) pending.push(questions[currentIndex]);

        if (pending.length > 0) {
          // Shuffle skipped questions and append them
          const reshuffled = pending
            .sort(() => Math.random() - 0.5)
            .map((q) => ({ ...q, wasSkipped: true }));

          setQuestions((prev) => [...prev, ...reshuffled]);
          setSkippedQuestions([]);
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswerRevealed(false);
          return;
        }
      }

      // Quiz truly finished -- report stats
      if (onUpdateStats) {
        const incorrect = questions.length - correctCount;
        onUpdateStats(subject, correctCount, incorrect, difficulty || undefined);
      }
      setIsQuizComplete(true);
    }
  };

  // ===================================================================
  // RENDER: "Before you go..." review-notes prompt modal
  // ===================================================================

  if (showReviewPrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-white/10">
          {/* Icon */}
          <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 mx-auto">
            <BookOpenIcon />
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
            Before you go...
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            Would you like to review the high-yield notes for{' '}
            <strong>{topic || subject}</strong>?
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setShowReviewPrompt(false);
                onReviewNotes?.();
              }}
              className="w-full py-3.5 rounded-xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 hover:scale-[1.02] transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
            >
              <BookOpenIcon className="w-5 h-5" />
              Yes, Review Notes
            </button>
            <button
              onClick={() => {
                setShowReviewPrompt(false);
                onExitToDashboard ? onExitToDashboard() : onClose();
              }}
              className="w-full py-3.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              No, Exit to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================================
  // RENDER: Difficulty selection screen (no difficulty chosen yet)
  // ===================================================================

  if (!difficulty) {
    return (
      <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {topic || subject} Quiz
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Select your challenge level to begin.
            </p>
          </div>
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* Quiz mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-white/60 dark:bg-slate-900/50 rounded-full backdrop-blur-md border border-slate-200 dark:border-white/5 shadow-sm">
            <button
              onClick={() => setQuizMode('review')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${quizMode === 'review'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Review Knowledge
            </button>
            <button
              onClick={() => setQuizMode('test')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${quizMode === 'test'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Test Knowledge
            </button>
          </div>
        </div>

        {/* Mode description */}
        <div className="text-center mb-8 text-slate-500 dark:text-slate-400 text-sm">
          {quizMode === 'review'
            ? 'Immediate feedback. Correct answers and explanations shown after each question.'
            : 'Simulation mode. No feedback until the end. Results grouped by accuracy.'}
        </div>

        {/* Difficulty cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${quizMode === 'review' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-6`}
        >
          {/* Easy */}
          <div
            onClick={() => loadQuestions('Easy')}
            className="glass-panel p-6 rounded-[2rem] cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all group relative overflow-hidden bg-white/60 dark:bg-slate-800/40"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Easy</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Recall based. Good for quick review.
            </p>
          </div>

          {/* Medium */}
          <div
            onClick={() => loadQuestions('Medium')}
            className="glass-panel p-6 rounded-[2rem] cursor-pointer hover:bg-opacity-50 transition-all group relative overflow-hidden bg-white/60 dark:bg-slate-800/40 hover:border-purple-500/50 hover:bg-purple-500/5"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500/10" />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Medium</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Clinical scenarios. Standard.
            </p>
          </div>

          {/* Hard */}
          <div
            onClick={() => loadQuestions('Hard')}
            className="glass-panel p-6 rounded-[2rem] cursor-pointer hover:border-red-500/50 hover:bg-red-500/5 transition-all group relative overflow-hidden bg-white/60 dark:bg-slate-800/40"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hard</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Complex vignettes.
            </p>
          </div>

          {/* Challenge (test mode only) */}
          {quizMode !== 'review' && (
            <div
              onClick={() => loadQuestions('Challenge')}
              className="glass-panel p-6 rounded-[2rem] cursor-pointer hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group relative overflow-hidden bg-white/60 dark:bg-slate-800/40"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                Challenge <span className="text-yellow-500 animate-pulse">{'\u26A1'}</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The ultimate test.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===================================================================
  // RENDER: Loading spinner while generating questions
  // ===================================================================

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4 border-purple-500" />
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
          Generating{' '}
          <span className="font-bold text-slate-900 dark:text-white">{difficulty}</span>{' '}
          level questions for{' '}
          <span className="text-slate-900 dark:text-white">{topic || subject}</span>...
        </p>
      </div>
    );
  }

  // ===================================================================
  // RENDER: Quiz complete -- reviewing answers one-by-one (Challenge)
  // ===================================================================

  if (isQuizComplete && isReviewingAnswers) {
    const currentQuestion = questions[currentIndex];
    const userAnswer = testAnswers.get(currentIndex);

    return (
      <div className="max-w-3xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-bold uppercase border border-yellow-200 dark:border-yellow-500/20">
              Review Mode
            </span>
            <span className="text-sm font-bold text-slate-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <button
            onClick={() => {
              setIsReviewingAnswers(false);
              setCurrentIndex(0);
            }}
            className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Back to Summary
          </button>
        </div>

        {/* Question card */}
        <div className="glass-panel p-8 rounded-[2rem] bg-white/60 dark:bg-slate-800/40 border dark:border-white/10">
          <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-8 leading-relaxed font-serif">
            {currentQuestion.question}
          </h2>

          {/* Options with correct/incorrect highlights */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswerIndex;
              const isUserChoice = userAnswer === idx;
              let optionClasses = 'border-slate-200 dark:border-white/5 opacity-60';
              if (isCorrect) {
                optionClasses =
                  'border-green-500 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-500 font-bold opacity-100';
              } else if (isUserChoice) {
                optionClasses =
                  'border-red-500 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-500 font-bold opacity-100';
              }

              return (
                <div
                  key={idx}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 ${optionClasses}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/50 dark:bg-black/20 text-sm font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isCorrect && <CheckIcon className="w-6 h-6 text-green-600" />}
                  {isUserChoice && !isCorrect && <XIcon className="w-6 h-6 text-red-600" />}
                </div>
              );
            })}
          </div>

          {/* Explanation toggle */}
          <div className="mb-8">
            {showExplanation ? (
              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 animate-in fade-in slide-in-from-top-2">
                <h3 className="font-bold text-amber-700 dark:text-amber-500 mb-2">
                  Explanation
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                  {currentQuestion.explanation}
                </p>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-500 hover:underline"
                >
                  Hide Explanation
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowExplanation(true)}
                className="w-full py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center gap-2"
              >
                <InfoIcon />
                Show Detailed Explanation
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setShowExplanation(false);
              }}
              disabled={currentIndex === 0}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${currentIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
            >
              Previous
            </button>
            <div className="flex gap-2">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => prev + 1);
                    setShowExplanation(false);
                  }}
                  className="px-6 py-3 rounded-xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsReviewingAnswers(false);
                    setCurrentIndex(0);
                  }}
                  className="px-6 py-3 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all"
                >
                  Finish Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================================
  // RENDER: Quiz complete -- results summary screen
  // ===================================================================

  if (isQuizComplete) {
    return (
      <div className="text-center p-12 glass-panel rounded-[2rem] max-w-4xl mx-auto mt-10 animate-in zoom-in-95 duration-500 bg-white/60 dark:bg-slate-800/40">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Quiz Complete!
        </h2>
        <div className="text-6xl font-bold mb-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] text-purple-600 dark:text-purple-400">
          {correctCount} / {questions.length}
        </div>
        <div className="inline-block px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm mb-10">
          Mode:{' '}
          <span className="font-bold mr-2">
            {quizMode === 'review' ? 'Review' : 'Test'}
          </span>
          Difficulty:{' '}
          <span className="text-slate-900 dark:text-white font-bold">{difficulty}</span>
        </div>

        {/* Test mode: show correct / incorrect grouped */}
        {quizMode === 'test' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-10">
            {/* Correct answers */}
            <div className="space-y-4">
              <h3 className="font-bold text-green-600 dark:text-green-400 border-b border-green-500/20 pb-2">
                Correct Answers ({correctCount})
              </h3>
              {questions.map((q, idx) =>
                testAnswers.get(idx) === q.correctAnswerIndex ? (
                  <div
                    key={idx}
                    className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg text-sm"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">
                      {idx + 1}.
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {q.question}
                    </span>
                  </div>
                ) : null,
              )}
            </div>

            {/* Incorrect answers */}
            <div className="space-y-4">
              <h3 className="font-bold text-red-600 dark:text-red-400 border-b border-red-500/20 pb-2">
                Incorrect Answers ({questions.length - correctCount})
              </h3>
              {questions.map((q, idx) => {
                const userAns = testAnswers.get(idx);
                return userAns !== undefined && userAns !== q.correctAnswerIndex ? (
                  <div
                    key={idx}
                    className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg text-sm"
                  >
                    <div className="mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">
                        {idx + 1}.
                      </span>{' '}
                      {q.question}
                    </div>
                    <div className="text-xs text-red-500">
                      Your Answer: {q.options[userAns]}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-bold">
                      Correct: {q.options[q.correctAnswerIndex]}
                    </div>
                    <div className="mt-2 text-xs italic text-slate-500">
                      {q.explanation}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setIsQuizComplete(false);
              setCorrectCount(0);
              setCurrentIndex(0);
              setTestAnswers(new Map());
            }}
            className="px-8 py-3 rounded-xl font-semibold transition-colors bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/5"
          >
            Restart Level
          </button>

          {difficulty === 'Challenge' && (
            <button
              onClick={() => {
                setIsReviewingAnswers(true);
                setCurrentIndex(0);
                setShowExplanation(false);
              }}
              className="px-8 py-3 rounded-xl font-semibold transition-colors bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg shadow-yellow-500/30 flex items-center gap-2"
            >
              <EyeIcon />
              Review Answers One-by-One
            </button>
          )}

          <button
            onClick={handleBack}
            className="px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg text-white bg-purple-600 hover:bg-purple-500 shadow-purple-900/50"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  // ===================================================================
  // RENDER: Active quiz -- current question
  // ===================================================================

  const currentQuestion = questions[currentIndex];

  // Error fallback
  if (!currentQuestion) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 dark:text-red-400 mb-4">
          Failed to load questions. Please try again.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswerIndex;

  // Difficulty badge color
  const difficultyBadgeClasses =
    difficulty === 'Easy'
      ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
      : difficulty === 'Hard'
        ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
        : 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Header bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {/* Difficulty badge */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${difficultyBadgeClasses}`}
          >
            {difficulty} Mode{' '}
            {difficulty === 'Challenge' && (
              <span className="text-yellow-500 ml-1">{'\u26A1'}</span>
            )}
          </span>

          {/* Question counter */}
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Question {currentIndex + 1} of {questions.length}
          </span>

          {/* Challenge timer */}
          {difficulty === 'Challenge' && timeRemaining !== null && (
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${timeRemaining < 60
                  ? 'bg-red-100 text-red-600 border-red-200 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10'
                }`}
            >
              <ClockIcon />
              <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleBack}
          className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-full"
        >
          <XIcon />
        </button>
      </div>

      {/* Question card */}
      <div className="glass-panel p-5 md:p-10 rounded-[2rem] mb-6 relative overflow-hidden bg-white/60 dark:bg-slate-800/40">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-slate-200 dark:bg-slate-800 w-full">
          <div
            className="h-full transition-all duration-300 shadow-[0_0_10px_currentColor] bg-purple-500"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question text */}
        <h2 className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white mb-10 leading-relaxed font-serif">
          {currentQuestion.question}
        </h2>

        {/* Answer options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isOptionCorrect = idx === currentQuestion.correctAnswerIndex;
            const isSelected = selectedAnswer === idx;

            let optionClasses =
              'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-800/50';

            if (isAnswerRevealed) {
              if (isOptionCorrect) {
                optionClasses =
                  'border-green-500/50 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-500/50 font-medium';
              } else if (isSelected) {
                optionClasses =
                  'border-red-500/50 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-500/50';
              } else {
                optionClasses =
                  'border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 opacity-50';
              }
            } else if (isSelected) {
              optionClasses =
                'border-purple-500 bg-purple-100 dark:bg-purple-500/10 ring-1 ring-purple-500 text-purple-700 dark:text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]';
            } else {
              optionClasses += ' hover:border-purple-300 dark:hover:border-purple-500/30';
            }

            // Letter badge color
            const letterBadgeClasses =
              isAnswerRevealed && isOptionCorrect
                ? 'bg-green-500 text-black'
                : isSelected
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400';

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={isAnswerRevealed}
                className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all flex items-center justify-between gap-4 ${optionClasses}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold flex-shrink-0 transition-colors ${letterBadgeClasses}`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-base md:text-lg">{option}</span>
                </div>
                {isAnswerRevealed && (
                  <div className="flex-shrink-0">
                    {isOptionCorrect && (
                      <CheckIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
                    )}
                    {!isOptionCorrect && isSelected && (
                      <XIcon className="w-6 h-6 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation panel (shown after answer reveal in review mode) */}
      {isAnswerRevealed && (
        <div
          className={`p-6 rounded-2xl border mb-6 animate-in fade-in slide-in-from-top-2 duration-300 glass-panel ${isCorrectAnswer
              ? 'border-green-500/30 bg-green-100/50 dark:bg-green-900/10'
              : 'border-red-500/30 bg-red-100/50 dark:bg-red-900/10'
            }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {isCorrectAnswer ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wider border border-green-500/20">
                Correct
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-full uppercase tracking-wider border border-red-500/20">
                Incorrect
              </span>
            )}
            <h3
              className={`font-bold ${isCorrectAnswer
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
                }`}
            >
              Explanation
            </h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm medical-serif">
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Bottom action buttons */}
      <div className="flex justify-between gap-4">
        {/* Skip button (only for non-skipped, non-revealed questions) */}
        {!currentQuestion.wasSkipped && !isAnswerRevealed ? (
          <button
            onClick={handleSkipQuestion}
            className="px-6 py-4 rounded-xl font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Skip
          </button>
        ) : (
          <div />
        )}

        <div className="flex gap-4">
          {quizMode === 'review' ? (
            isAnswerRevealed ? (
              <button
                onClick={() => handleNextQuestion(false)}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-lg"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className={`px-8 py-4 rounded-xl font-bold transition-all ${selectedAnswer === null
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-white/5'
                    : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  }`}
              >
                Check Answer
              </button>
            )
          ) : (
            <button
              onClick={() => handleNextQuestion(false)}
              disabled={selectedAnswer === null}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${selectedAnswer === null
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                }`}
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Submit Exam'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

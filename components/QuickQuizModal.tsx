import React, { useState, useEffect } from 'react';
import { MedicalSubject, ExamStream } from '../types';
import { fetchMCQs } from '../services/mcqService';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface QuickQuizModalProps {
  subject: MedicalSubject;
  stream: ExamStream;
  onClose: () => void;
  onUpdateStats: (subject: MedicalSubject, correct: boolean) => void;
  stats?: { correct: number; incorrect: number };
}

/* ------------------------------------------------------------------ */
/*  Shared UI fragments                                                */
/* ------------------------------------------------------------------ */

/** Full-screen backdrop used by every modal state (loading, empty, quiz). */
const ModalBackdrop: React.FC<{ children: React.ReactNode; extraClasses?: string }> = ({
  children,
  extraClasses = '',
}) => (
  <div
    className={
      'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ' +
      'animate-in fade-in duration-300 ' +
      extraClasses
    }
  >
    {children}
  </div>
);

/** The rounded glass card that wraps every modal state. */
const ModalCard: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({
  children,
  wide = false,
}) => (
  <div
    className={
      'glass-panel p-8 rounded-3xl w-full mx-4 bg-white/90 dark:bg-slate-800/90 ' +
      (wide
        ? 'max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300'
        : 'max-w-2xl')
    }
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const QuickQuizModal: React.FC<QuickQuizModalProps> = ({
  subject,
  stream,
  onClose,
  onUpdateStats,
  stats = { correct: 0, incorrect: 0 },
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<MCQQuestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  /* ---- Data fetching ---- */

  const loadNewQuestion = async () => {
    setIsLoading(true);
    setSelectedOptionIndex(null);
    setIsAnswerRevealed(false);

    try {
      const questions: MCQQuestion[] = await fetchMCQs(
        subject,
        1,
        stream,
        undefined,
        'Challenge',
      );
      if (questions.length > 0) {
        setCurrentQuestion(questions[0]);
      }
    } catch (error) {
      console.error('Failed to load MCQ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Handlers ---- */

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null || !currentQuestion) return;

    setIsAnswerRevealed(true);
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;
    onUpdateStats(subject, isCorrect);
  };

  const handleRollAnother = () => {
    loadNewQuestion();
  };

  const handleSelectOption = (index: number) => {
    if (!isAnswerRevealed) {
      setSelectedOptionIndex(index);
    }
  };

  /* ---- Derived values ---- */

  const isCorrectAnswer = selectedOptionIndex === currentQuestion?.correctAnswerIndex;
  const totalAnswered = stats.correct + stats.incorrect;
  const accuracyPercent = totalAnswered > 0 ? Math.round((stats.correct / totalAnswered) * 100) : 0;

  /* ---- Loading state ---- */

  if (isLoading) {
    return (
      <ModalBackdrop>
        <ModalCard>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Loading quick quiz...</p>
          </div>
        </ModalCard>
      </ModalBackdrop>
    );
  }

  /* ---- No questions available ---- */

  if (!currentQuestion) {
    return (
      <ModalBackdrop>
        <ModalCard>
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No questions available</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500"
            >
              Close
            </button>
          </div>
        </ModalCard>
      </ModalBackdrop>
    );
  }

  /* ---- Main quiz UI ---- */

  return (
    <ModalBackdrop extraClasses="p-4">
      <ModalCard wide>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {'🎯 Quick Quiz: '}
              {subject}
            </h2>

            <div className="flex items-center gap-4 text-sm">
              {/* Difficulty badge */}
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-full font-bold flex items-center gap-1">
                <span className="text-yellow-500">{'⚡'}</span> Challenge Mode
              </span>

              {/* Accuracy tracker */}
              <span className="text-slate-500 dark:text-slate-400">
                Accuracy:{' '}
                <span className="font-bold text-slate-900 dark:text-white">
                  {accuracyPercent}%
                </span>{' '}
                ({stats.correct}/{totalAnswered})
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Question text */}
        <div className="mb-6">
          <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((optionText, optionIndex) => {
            const isCorrectOption = optionIndex === currentQuestion.correctAnswerIndex;
            const isSelected = selectedOptionIndex === optionIndex;

            let borderStyle =
              'border-slate-200 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-500/30';

            if (isAnswerRevealed) {
              if (isCorrectOption) {
                borderStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-500';
              } else if (isSelected) {
                borderStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-500';
              } else {
                borderStyle = 'border-slate-200 dark:border-white/10 opacity-50';
              }
            } else if (isSelected) {
              borderStyle = 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 ring-2 ring-cyan-500';
            }

            const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D...

            return (
              <button
                key={optionIndex}
                onClick={() => handleSelectOption(optionIndex)}
                disabled={isAnswerRevealed}
                className={
                  `w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ` +
                  (isAnswerRevealed ? 'cursor-default' : 'cursor-pointer')
                }
              >
                <div className="flex items-center gap-3">
                  {/* Letter badge */}
                  <span
                    className={
                      'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ' +
                      (isAnswerRevealed && isCorrectOption
                        ? 'bg-green-500 text-white'
                        : isSelected
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300')
                    }
                  >
                    {optionLetter}
                  </span>

                  {/* Option text */}
                  <span className="text-slate-900 dark:text-white">{optionText}</span>

                  {/* Checkmark for correct answer after reveal */}
                  {isAnswerRevealed && isCorrectOption && (
                    <svg
                      className="w-5 h-5 text-green-500 ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback banner (shown after answer is revealed) */}
        {isAnswerRevealed && (
          <div
            className={
              'p-4 rounded-xl mb-6 ' +
              (isCorrectAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30')
            }
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={
                  'font-bold ' +
                  (isCorrectAnswer
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400')
                }
              >
                {isCorrectAnswer ? '\u2713 Correct!' : '\u2717 Incorrect'}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {isAnswerRevealed ? (
            <>
              {/* Roll Another button */}
              <button
                onClick={handleRollAnother}
                className={
                  'flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 ' +
                  'text-white hover:from-purple-500 hover:to-pink-500 shadow-lg ' +
                  'flex items-center justify-center gap-2'
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Roll Another
              </button>

              {/* Done button */}
              <button
                onClick={onClose}
                className={
                  'px-6 py-3 rounded-xl font-bold bg-slate-200 dark:bg-slate-700 ' +
                  'text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                }
              >
                Done
              </button>
            </>
          ) : (
            /* Check Answer button (disabled until an option is selected) */
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOptionIndex === null}
              className={
                'flex-1 py-3 rounded-xl font-bold transition-all ' +
                (selectedOptionIndex === null
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg')
              }
            >
              Check Answer
            </button>
          )}
        </div>
      </ModalCard>
    </ModalBackdrop>
  );
};

export default QuickQuizModal;

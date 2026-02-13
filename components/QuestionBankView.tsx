import React from 'react';
import { ExamStream } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QuestionBankTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

interface QuestionBankViewProps {
  onSelectTopic: (topicTitle: string) => void;
  completedSubjects?: string[];
  onStartMegaTest?: () => void;
  stream: ExamStream;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SUBJECT_EMOJI_MAP: Record<string, string> = {
  Anatomy: '\u{1F480}',
  Physiology: '\u{1F9E0}',
  Biochemistry: '\u{1F9EC}',
  Pharmacology: '\u{1F48A}',
  'General Pathology': '\u{1F52C}',
  Microbiology: '\u{1F9A0}',
  'Community Medicine': '\u{1F3E5}',
  'Dental Materials': '\u{1F9B7}',
  'Oral Histology': '\u{1F4CA}',
  'Tooth Morphology': '\u{1F9B7}',
  'Oral Pathology': '\u{1F52C}',
  Periodontology: '\u{1F9B7}',
  'Oral Medicine & Radiology': '\u{1F4F8}',
  'Internal Medicine': '\u{1FA7A}',
  Surgery: '\u{1F52A}',
  Orthodontics: '\u{1F9B7}',
  Prosthodontics: '\u{1F9B7}',
  'Oral & Maxillofacial Surgery': '\u{1F52A}',
  'Operative Dentistry & Endodontics': '\u{1F9B7}',
  'Pediatric Dentistry': '\u{1F476}',
};

function getSubjectIcon(subjectName: string): string {
  return SUBJECT_EMOJI_MAP[subjectName] || '\u{1F4DA}';
}

function buildTopicsFromSubjects(subjects: string[]): QuestionBankTopic[] {
  return subjects.map((subject) => ({
    id: subject.toLowerCase().replace(/\s+/g, '-'),
    title: `${subject} - Practice Questions`,
    category: subject,
    description: `High-yield MCQs for ${subject}`,
    icon: getSubjectIcon(subject),
  }));
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Lightning bolt icon used inside the Mega Test CTA button. */
const LightningBoltIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

/** Right-arrow icon shown on each topic card. */
const ArrowRightIcon: React.FC = () => (
  <svg
    className="w-4 h-4 transition-transform group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

/** Document icon displayed in the empty-state illustration. */
const DocumentIcon: React.FC = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

/** Clock icon used inside the "Coming Soon" promo banner. */
const ClockIcon: React.FC = () => (
  <svg
    className="w-16 h-16 md:w-24 md:h-24 text-white/20"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Mega Test Banner
// ---------------------------------------------------------------------------

interface MegaTestBannerProps {
  onStart?: () => void;
  topicCount: number;
}

const MegaTestBanner: React.FC<MegaTestBannerProps> = ({ onStart, topicCount }) => (
  <div
    onClick={onStart}
    className="group relative w-full glass-panel p-8 rounded-[2rem] cursor-pointer overflow-hidden border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent hover:scale-[1.01] transition-all"
  >
    {/* Hover glow */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <span className="text-3xl">{'\u{1F3C6}'}</span> Comprehensive Mega Test
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Challenge yourself with a randomized exam covering{' '}
          <strong>ALL</strong> your completed modules ({topicCount} subjects).
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-bold shadow-lg shadow-amber-900/20 group-hover:bg-amber-400 transition-colors">
        Start Challenge
        <LightningBoltIcon />
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Topic Card
// ---------------------------------------------------------------------------

interface TopicCardProps {
  topic: QuestionBankTopic;
  onSelect: (topicTitle: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => (
  <div
    onClick={() => onSelect(topic.title)}
    className="group relative glass-panel p-5 md:p-8 rounded-[2rem] hover:-translate-y-1 transition-all cursor-pointer overflow-hidden hover:border-cyan-500/30 bg-white/60 dark:bg-slate-800/40"
  >
    {/* Hover glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

    {/* Header: icon + category badge */}
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors group-hover:rotate-6 ring-1 ring-slate-200 dark:ring-white/10">
        {topic.icon}
      </div>
      <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-300 dark:border-white/5">
        {topic.category}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors relative z-10">
      {topic.title}
    </h3>

    {/* Description */}
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
      {topic.description}
    </p>

    {/* CTA */}
    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-500 font-bold text-xs uppercase tracking-widest relative z-10">
      Start Exam Paper
      <ArrowRightIcon />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-400">
      <DocumentIcon />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
      No Question Banks Available
    </h3>
    <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
      Mark subjects as completed on the Dashboard to unlock their related question banks here.
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// Exam Simulator Promo Banner
// ---------------------------------------------------------------------------

const ExamSimulatorBanner: React.FC = () => (
  <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative border border-white/5">
    <div className="flex-1 relative z-10">
      <h3 className="text-2xl font-bold mb-4">Exam Simulator (Coming Soon)</h3>
      <p className="text-slate-300 dark:text-slate-400 leading-relaxed mb-6">
        We are working on a full-length mock exam simulator that adjusts difficulty in real-time
        based on your performance in these topic banks.
      </p>
      <div className="flex gap-4">
        <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-slate-200 border border-white/10">
          Timed Mode
        </span>
        <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-slate-200 border border-white/10">
          Clinical Vignettes
        </span>
      </div>
    </div>

    <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <ClockIcon />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onSelectTopic,
  completedSubjects = [],
  onStartMegaTest,
  stream,
}) => {
  console.log('QuestionBankView - Completed Subjects:', completedSubjects);

  const topics = buildTopicsFromSubjects(completedSubjects);
  const hasTopics = topics.length > 0;

  const headerDescription = hasTopics
    ? 'Practice MCQs from your completed modules.'
    : 'Complete modules on the Dashboard to unlock question banks here.';

  return (
    <div className="max-w-6xl mx-auto py-8 pb-24">
      {/* Page header */}
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
          High-Yield Question Banks
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
          {headerDescription}
        </p>
      </div>

      {/* Topic grid -or- empty state */}
      {hasTopics ? (
        <div className="space-y-8">
          <MegaTestBanner onStart={onStartMegaTest} topicCount={topics.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onSelect={onSelectTopic} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Coming-soon promo */}
      <ExamSimulatorBanner />
    </div>
  );
};

export default QuestionBankView;

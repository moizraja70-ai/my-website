import React, { useState } from 'react';
import { MedicalSubject, ExamStream, TopicItem } from '../types';
import { SUBJECT_TOPICS } from '../constants';

// ---------------------------------------------------------------------------
// SVG icon helpers (inlined in the production bundle as raw <svg> elements)
// ---------------------------------------------------------------------------

/** Left-arrow icon for the back button */
const ArrowLeftIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

/** Chevron-down icon used for expandable section headers */
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/** Document/file icon shown on "Read Notes" when content is unlocked */
const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

/** Clipboard-check icon shown on "Solve MCQs" when content is unlocked */
const ClipboardCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
);

/** Lock icon shown when a topic is gated behind PRO / preview mode */
const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SubjectDetailViewProps {
  subject: MedicalSubject;
  stream: ExamStream;
  onSelectNoteTopic: (topic: string) => void;
  onSelectQuizTopic: (topic: string) => void;
  onBack: () => void;
  isPreviewMode?: boolean;
}

// ---------------------------------------------------------------------------
// Helper: type-guard for grouped (parent + subtopics) topic items
// ---------------------------------------------------------------------------

function isGroupedTopic(item: TopicItem): item is { parent: string; subtopics: TopicItem[] } {
  return typeof item === 'object' && 'parent' in item && 'subtopics' in item;
}

// ---------------------------------------------------------------------------
// Sub-components for action buttons (Read Notes / Solve MCQs)
// ---------------------------------------------------------------------------

interface TopicActionButtonsProps {
  topicName: string;
  isLocked: boolean;
  onSelectNoteTopic: (topic: string) => void;
  onSelectQuizTopic: (topic: string) => void;
  /** Tailwind size classes for icons, e.g. "w-4 h-4" or "w-3.5 h-3.5" */
  iconSize: string;
  /** Tailwind padding classes for the buttons */
  buttonPadding: string;
  /** Font-size class for button text */
  textSize: string;
  /** Left padding applied to the button container on small screens */
  containerPl: string;
}

const TopicActionButtons: React.FC<TopicActionButtonsProps> = ({
  topicName,
  isLocked,
  onSelectNoteTopic,
  onSelectQuizTopic,
  iconSize,
  buttonPadding,
  textSize,
  containerPl,
}) => (
  <div className={`flex items-center gap-2 ${containerPl} md:pl-0`}>
    {/* Read Notes */}
    <button
      onClick={() => onSelectNoteTopic(topicName)}
      className={`flex items-center gap-1.5 ${buttonPadding} bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg ${textSize} font-medium transition-colors border border-slate-300 dark:border-white/5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`}
    >
      {isLocked
        ? <LockIcon className={`${iconSize} text-slate-500`} />
        : <FileTextIcon className={iconSize} />}
      Read Notes
    </button>

    {/* Solve MCQs */}
    <button
      onClick={() => onSelectQuizTopic(topicName)}
      className={`flex items-center gap-1.5 ${buttonPadding} rounded-lg ${textSize} font-bold transition-colors shadow-lg ${
        isLocked
          ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20'
      }`}
    >
      {isLocked
        ? <LockIcon className={iconSize} />
        : <ClipboardCheckIcon className={iconSize} />}
      Solve MCQs
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// Top-level action buttons (slightly larger sizing than nested ones)
// ---------------------------------------------------------------------------

const TopLevelActionButtons: React.FC<{
  topicName: string;
  isLocked: boolean;
  onSelectNoteTopic: (topic: string) => void;
  onSelectQuizTopic: (topic: string) => void;
}> = (props) => (
  <div className="flex items-center gap-3 pl-12 md:pl-0">
    <button
      onClick={() => props.onSelectNoteTopic(props.topicName)}
      className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-300 dark:border-white/5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    >
      {props.isLocked
        ? <LockIcon className="w-4 h-4 text-slate-500" />
        : <FileTextIcon className="w-4 h-4" />}
      Read Notes
    </button>

    <button
      onClick={() => props.onSelectQuizTopic(props.topicName)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg ${
        props.isLocked
          ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20'
      }`}
    >
      {props.isLocked
        ? <LockIcon className="w-4 h-4" />
        : <ClipboardCheckIcon className="w-4 h-4" />}
      Solve MCQs
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  stream,
  onSelectNoteTopic,
  onSelectQuizTopic,
  onBack,
  isPreviewMode = false,
}) => {
  // Resolve the topic list for this subject, falling back to the default list
  const topics: TopicItem[] = SUBJECT_TOPICS[subject] || SUBJECT_TOPICS['default'];

  // Track which grouped sections are currently expanded (by parent name)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  /** Toggle a section open/closed by its parent name */
  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionName)) {
        next.delete(sectionName);
      } else {
        next.add(sectionName);
      }
      return next;
    });
  };

  /**
   * Determine whether a given topic is locked behind preview-mode restrictions.
   * In preview mode every topic is locked EXCEPT "Impression Materials", which
   * is left freely accessible as a sample / teaser.
   */
  const isLockedTopic = (topicName: string): boolean => {
    return !(!isPreviewMode || topicName === 'Impression Materials');
  };

  // -------------------------------------------------------------------------
  // Render helpers for each nesting depth
  // -------------------------------------------------------------------------

  /** Render a leaf-level topic at the deepest nesting (level 3) */
  const renderLevel3Topic = (item: TopicItem, index: number) => {
    const topicName = typeof item === 'string' ? item : item.parent;
    const locked = isLockedTopic(topicName);

    return (
      <div
        key={index}
        className="glass-panel p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/30 dark:bg-slate-800/10"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            {index + 1}
          </div>
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {topicName}
            {locked && (
              <span className="ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                PRO
              </span>
            )}
          </h5>
        </div>

        <TopicActionButtons
          topicName={topicName}
          isLocked={locked}
          onSelectNoteTopic={onSelectNoteTopic}
          onSelectQuizTopic={onSelectQuizTopic}
          iconSize="w-3.5 h-3.5"
          buttonPadding="px-3 py-1.5"
          textSize="text-xs"
          containerPl="pl-7"
        />
      </div>
    );
  };

  /** Render a subtopic at level 2 (inside a top-level grouped section) */
  const renderLevel2Topic = (item: TopicItem, index: number) => {
    // If this subtopic is itself a grouped topic, render it as collapsible
    if (isGroupedTopic(item)) {
      const isExpanded = expandedSections.has(item.parent);

      return (
        <div key={index} className="space-y-2">
          {/* Nested group header */}
          <div
            className="glass-panel p-4 rounded-lg flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/40 dark:bg-slate-800/20 cursor-pointer"
            onClick={() => toggleSection(item.parent)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                {index + 1}
              </div>
              <h4 className="text-base font-medium text-slate-700 dark:text-slate-300">
                {item.parent}
              </h4>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Level 3 children */}
          {isExpanded && (
            <div className="ml-8 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
              {item.subtopics.map((child, childIdx) => renderLevel3Topic(child, childIdx))}
            </div>
          )}
        </div>
      );
    }

    // Simple string subtopic at level 2
    const topicName = item as string;
    const locked = isLockedTopic(topicName);

    return (
      <div
        key={index}
        className="glass-panel p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/40 dark:bg-slate-800/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            {index + 1}
          </div>
          <h4 className="text-base font-medium text-slate-700 dark:text-slate-300">
            {topicName}
            {locked && (
              <span className="ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                PRO
              </span>
            )}
          </h4>
        </div>

        <TopicActionButtons
          topicName={topicName}
          isLocked={locked}
          onSelectNoteTopic={onSelectNoteTopic}
          onSelectQuizTopic={onSelectQuizTopic}
          iconSize="w-3.5 h-3.5"
          buttonPadding="px-3 py-1.5"
          textSize="text-xs"
          containerPl="pl-9"
        />
      </div>
    );
  };

  /** Render a top-level topic entry in the list */
  const renderTopLevelTopic = (item: TopicItem, index: number) => {
    // Grouped topic with collapsible subtopics
    if (isGroupedTopic(item)) {
      const isExpanded = expandedSections.has(item.parent);

      return (
        <div key={index} className="space-y-2">
          {/* Collapsible group header */}
          <div
            className="glass-panel p-5 rounded-xl flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/60 dark:bg-slate-800/40 cursor-pointer"
            onClick={() => toggleSection(item.parent)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.parent}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.subtopics.length} sub-topics
                </p>
              </div>
            </div>
            <ChevronDownIcon
              className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>

          {/* Expanded children (level 2) */}
          {isExpanded && (
            <div className="ml-12 space-y-2 animate-in slide-in-from-top-2 fade-in duration-300">
              {item.subtopics.map((child, childIdx) => renderLevel2Topic(child, childIdx))}
            </div>
          )}
        </div>
      );
    }

    // Simple string topic at the top level
    const topicName = item as string;
    const locked = isLockedTopic(topicName);

    return (
      <div
        key={index}
        className="glass-panel p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/60 dark:bg-slate-800/40"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20">
            {index + 1}
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {topicName}
            {locked && (
              <span className="ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                PRO
              </span>
            )}
          </h3>
        </div>

        <TopLevelActionButtons
          topicName={topicName}
          isLocked={locked}
          onSelectNoteTopic={onSelectNoteTopic}
          onSelectQuizTopic={onSelectQuizTopic}
        />
      </div>
    );
  };

  // -------------------------------------------------------------------------
  // Main render
  // -------------------------------------------------------------------------

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* ---- Header ---- */}
      <div className="flex items-center gap-4 mb-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeftIcon />
        </button>

        {/* Title block */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {subject}
            </h1>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20">
              {stream} CURRICULUM
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Select a topic below to access study notes or practice MCQs.
          </p>
        </div>
      </div>

      {/* ---- Topic list ---- */}
      <div className="grid grid-cols-1 gap-4">
        {topics.map((item, index) => renderTopLevelTopic(item, index))}
      </div>
    </div>
  );
};

export default SubjectDetailView;

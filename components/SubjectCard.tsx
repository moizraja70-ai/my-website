import React from 'react';
import { MedicalSubject } from '../types';
import { SUBJECT_ICONS } from '../constants';

interface SubjectCardProps {
  subject: MedicalSubject;
  onClick: (subject: MedicalSubject) => void;
  isCompleted?: boolean;
  onToggleComplete?: (subject: string, e?: React.MouseEvent) => void;
  isLocked?: boolean;
  onLockedClick?: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onClick,
  isCompleted = false,
  onToggleComplete,
  isLocked,
  onLockedClick,
}) => {
  const handleClick = () => {
    if (isLocked && onLockedClick) {
      onLockedClick();
      return;
    }
    onClick(subject);
  };

  return (
    <div
      onClick={handleClick}
      className={`glass-panel p-6 rounded-[1.5rem] transition-all duration-300 group flex flex-col h-full relative overflow-hidden cursor-pointer ${
        isCompleted
          ? 'bg-slate-100/50 dark:bg-slate-900/20 border-slate-200 dark:border-white/5 grayscale-[0.8] hover:grayscale-0 opacity-70 hover:opacity-100'
          : 'bg-white/40 dark:bg-slate-800/20 hover:border-cyan-500/30'
      }`}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Toggle complete button */}
      {onToggleComplete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(subject, e);
          }}
          className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isCompleted
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-slate-200 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
          title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
        >
          {isCompleted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                className="opacity-0 group-hover:opacity-50"
              />
            </svg>
          )}
        </button>
      )}

      {/* Icon and title */}
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div
          className={`p-3.5 rounded-2xl transition-colors shadow-lg ring-1 ring-slate-200 dark:ring-white/5 ${
            isCompleted
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              : 'bg-slate-100 dark:bg-slate-800/50 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white shadow-black/5 dark:shadow-black/20'
          }`}
        >
          {SUBJECT_ICONS[subject] || (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          )}
        </div>
        <h3
          className={`font-bold text-lg leading-tight tracking-wide ${
            isCompleted
              ? 'text-slate-500 dark:text-slate-400 line-through decoration-2 decoration-slate-400/50'
              : 'text-slate-800 dark:text-slate-100'
          }`}
        >
          {subject}
        </h3>
      </div>

      {/* Footer */}
      <div className="mt-auto relative z-10">
        <span
          className={`text-sm font-medium transition-colors flex items-center gap-2 ${
            isCompleted
              ? 'text-green-600 dark:text-green-500'
              : 'text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
          }`}
        >
          {isCompleted ? 'Completed' : 'View Topics & MCQs'}
          {!isCompleted && (
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default SubjectCard;

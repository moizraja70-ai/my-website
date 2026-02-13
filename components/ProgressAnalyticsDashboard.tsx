import React from 'react';
import { ExamStream } from '../types';

interface ProgressAnalyticsDashboardProps {
  stream: ExamStream;
  onStartStudy: (topic?: string) => void;
  completedSubjects?: string[];
  userName?: string;
  quizStats?: Record<string, { correct: number; incorrect: number }>;
  mockScores?: { score: number; total: number; timestamp: number }[];
  isPreviewMode?: boolean;
  onLockedAccess?: () => void;
}

interface TopicPerformanceEntry {
  subject: string;
  percent: number;
}

interface ChartPoint {
  x: number;
  y: number;
}

interface QuickActionCard {
  title: string;
  sub: string;
  icon: 'star' | 'timer' | 'layer' | 'file' | 'chat';
  action: () => void;
  locked: boolean;
}

const ProgressAnalyticsDashboard: React.FC<ProgressAnalyticsDashboardProps> = ({
  stream,
  onStartStudy,
  completedSubjects = [],
  userName = 'Frostloo',
  quizStats = {},
  mockScores = [],
  isPreviewMode = false,
  onLockedAccess,
}) => {
  // ---------------------------------------------------------------------------
  // Compute overall quiz accuracy
  // ---------------------------------------------------------------------------
  let totalCorrect = 0;
  let totalAttempted = 0;

  for (const subject in quizStats) {
    const stats = quizStats[subject];
    totalCorrect += stats.correct;
    totalAttempted += stats.correct + stats.incorrect;
  }

  const overallAccuracyPercent =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // ---------------------------------------------------------------------------
  // Build per-topic bar chart data (up to 6 entries, padded with empty slots)
  // ---------------------------------------------------------------------------
  const topicPerformance: TopicPerformanceEntry[] = Object.entries(quizStats)
    .slice(0, 6)
    .map(([subject, stats]) => ({
      subject,
      percent:
        stats.correct + stats.incorrect > 0
          ? Math.round(
              (stats.correct / (stats.correct + stats.incorrect)) * 100,
            )
          : 0,
    }))
    .concat(
      Array(Math.max(0, 6 - Object.keys(quizStats).length))
        .fill(null)
        .map(() => ({ subject: 'No Data', percent: 0 })),
    )
    .slice(0, 6);

  // ---------------------------------------------------------------------------
  // Build SVG path for the mock-scores trend line
  // ---------------------------------------------------------------------------
  const CHART_WIDTH = 200;
  const CHART_HEIGHT = 120;
  const CHART_TOP_PADDING = 20;

  const trendLinePath: string = (() => {
    if (mockScores.length === 0) {
      return 'M0,40 L50,35 L100,45 L150,30 L200,50';
    }

    const recentScores = mockScores.slice(-7);

    const points: ChartPoint[] = recentScores.map((entry, index) => {
      const xPosition =
        (index / Math.max(recentScores.length - 1, 1)) * CHART_WIDTH;
      const scorePercent = (entry.score / entry.total) * 100;
      const yPosition =
        CHART_HEIGHT - (scorePercent / 100) * (CHART_HEIGHT - CHART_TOP_PADDING);
      return { x: xPosition, y: yPosition };
    });

    return points
      .map(
        (point, index) =>
          `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`,
      )
      .join(' ');
  })();

  // Area fill path: same line path but closed to the bottom of the chart
  const trendAreaPath =
    mockScores.length > 0
      ? `${trendLinePath} V128 H0 Z`
      : 'M0,40 L50,35 L100,45 L150,30 L200,50 V120 H0 Z';

  // Day-of-week labels for the x-axis
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const trendDayLabels: string[] =
    mockScores.length === 0
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : mockScores.slice(-7).map((entry) => {
          const date = new Date(entry.timestamp);
          return DAY_NAMES[date.getDay()];
        });

  // ---------------------------------------------------------------------------
  // Donut chart geometry for the readiness ring
  // ---------------------------------------------------------------------------
  const RING_CIRCUMFERENCE = 2 * Math.PI * 50; // radius = 50
  const ringStrokeDashoffset =
    RING_CIRCUMFERENCE - (overallAccuracyPercent / 100) * RING_CIRCUMFERENCE;

  // ---------------------------------------------------------------------------
  // Quick-action cards
  // ---------------------------------------------------------------------------
  const quickActions: QuickActionCard[] = [
    {
      title: 'Impression Quiz',
      sub: 'High Yield',
      icon: 'star',
      action: () => onStartStudy('Impression Materials'),
      locked: false,
    },
    {
      title: 'Timed Mock',
      sub: 'Next: 2h',
      icon: 'timer',
      action: () => onStartStudy(),
      locked: isPreviewMode,
    },
    {
      title: 'Flashcards',
      sub: 'Daily Review',
      icon: 'layer',
      action: () => {},
      locked: isPreviewMode,
    },
    {
      title: 'Past Papers',
      sub: 'Recalls 2023',
      icon: 'file',
      action: () => {},
      locked: isPreviewMode,
    },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      {/* ------------------------------------------------------------------ */}
      {/* Header row                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Progress Analytics Dashboard
        </h2>

        <div className="flex items-center gap-3 bg-slate-200 dark:bg-slate-800 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          {/* Calendar icon */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <span>{userName}</span>

          {/* Chevron-down icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main 4-column stats grid                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ---- Overall Readiness (donut ring) ---- */}
        <div className="glass-panel p-6 rounded-3xl bg-slate-800/80 dark:bg-[#1e293b]/60 flex flex-col items-center justify-center relative overflow-hidden group">
          <h3 className="text-slate-400 text-sm font-semibold self-start mb-4">
            Overall Readiness
          </h3>

          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r="50"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-slate-700 dark:text-slate-700/50"
              />
              {/* Foreground progress ring */}
              <circle
                cx="80"
                cy="80"
                r="50"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringStrokeDashoffset}
                strokeLinecap="round"
                className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Percentage label inside the ring */}
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              {overallAccuracyPercent}%
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400 font-mono">
            Overall Readiness: {overallAccuracyPercent}%
          </p>
        </div>

        {/* ---- Topic Performance (bar chart) ---- */}
        <div className="glass-panel p-6 rounded-3xl bg-slate-800/80 dark:bg-[#1e293b]/60 flex flex-col">
          <h3 className="text-slate-400 text-sm font-semibold mb-6">
            Topic Performance
          </h3>

          <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
            {topicPerformance.map((topic, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group w-full"
              >
                <div
                  className="w-full bg-cyan-400/80 rounded-t-sm hover:bg-cyan-300 transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                  style={{ height: `${Math.max(topic.percent, 5)}%` }}
                  title={`${topic.subject}: ${topic.percent}%`}
                />
                <span
                  className="text-[10px] text-slate-500 uppercase truncate w-12 text-center"
                  title={topic.subject}
                >
                  {topic.subject.substring(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Mock Scores Trend (line chart) ---- */}
        <div className="glass-panel p-6 rounded-3xl bg-slate-800/80 dark:bg-[#1e293b]/60 flex flex-col">
          <h3 className="text-slate-400 text-sm font-semibold mb-2">
            Mock Scores Trend
          </h3>

          <div className="flex-1 relative w-full h-full flex items-end">
            <svg
              className="w-full h-32 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Trend line */}
              <path
                d={trendLinePath}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                className="drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
              />
              {/* Gradient-filled area under the line */}
              <path
                d={trendAreaPath}
                fill="url(#gradient)"
                className="opacity-20"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            {/* Day-of-week labels along the x-axis */}
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-slate-500 px-1">
              {trendDayLabels.map((dayLabel, index) => (
                <span key={index}>{dayLabel}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Completed Modules list ---- */}
        <div className="glass-panel p-6 rounded-3xl bg-slate-800/80 dark:bg-[#1e293b]/60 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-400 text-sm font-semibold">
              Completed Modules
            </h3>
            <button className="text-slate-500 hover:text-white">
              {/* Clipboard icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {completedSubjects.length > 0 ? (
              completedSubjects.map((subjectName, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group cursor-pointer animate-in slide-in-from-right-4 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Checkmark badge */}
                  <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <svg
                      className="w-4 h-4"
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
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-200 truncate group-hover:text-emerald-400 transition-colors">
                      {subjectName}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      Marked as completed
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center mb-3 text-slate-500">
                  {/* Plus icon */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-400">
                  No modules completed yet.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Tick subjects below to track progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Start Study Session CTA button                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative group">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

        <button
          onClick={() => onStartStudy()}
          className="relative w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-4 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]"
        >
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Start Study Session
          </span>

          {/* Play-circle icon */}
          <svg
            className="w-6 h-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Quick-action cards grid                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              if (card.locked) {
                onLockedAccess?.();
              } else {
                card.action();
              }
            }}
            className={`glass-panel p-5 rounded-2xl transition-colors flex items-center justify-between group ${
              card.locked
                ? 'bg-slate-800/40 dark:bg-[#1e293b]/20 cursor-not-allowed opacity-60'
                : 'bg-slate-800/60 dark:bg-[#1e293b]/40 hover:bg-slate-700/60 cursor-pointer'
            }`}
          >
            {/* Card text */}
            <div>
              <h4
                className={`font-bold ${
                  card.locked
                    ? 'text-slate-500'
                    : 'text-slate-200 group-hover:text-white'
                }`}
              >
                {card.title}
              </h4>
              <p
                className={`text-xs ${
                  card.locked
                    ? 'text-slate-600'
                    : 'text-slate-500 group-hover:text-slate-400'
                }`}
              >
                {card.sub}
              </p>
            </div>

            {/* Card icon */}
            <div
              className={`transition-colors ${
                card.locked
                  ? 'text-slate-500'
                  : 'text-slate-600 group-hover:text-cyan-400'
              }`}
            >
              {card.locked ? (
                /* Lock icon */
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ) : (
                <>
                  {card.icon === 'star' && (
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                  {card.icon === 'timer' && (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {card.icon === 'layer' && (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  )}
                  {card.icon === 'file' && (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                  {card.icon === 'chat' && (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressAnalyticsDashboard;

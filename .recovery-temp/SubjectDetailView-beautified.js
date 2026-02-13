import { J as L, j as e } from "./index-6C5HM6Z-.js";
import { a as v } from "./constants-BxwWLtd0.js";

const M = ({
  subject: p,
  stream: b,
  onSelectNoteTopic: x,
  onSelectQuizTopic: c,
  onBack: j,
  isPreviewMode: f = !1
}) => {
  const w = v[p] || v.default,
    [m, N] = L.useState(new Set),

    u = (t) => {
      N((o) => {
        const s = new Set(o);
        return s.has(t) ? s.delete(t) : s.add(t), s;
      });
    },

    k = (t) => typeof t == "object" && "parent" in t && "subtopics" in t,

    h = (t) => !(!f || t === "Impression Materials");

  return e.jsxs("div", {
    className: "max-w-6xl mx-auto pb-24",
    children: [
      // Header section
      e.jsxs("div", {
        className: "flex items-center gap-4 mb-8",
        children: [
          // Back button
          e.jsx("button", {
            onClick: j,
            className: "p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white",
            children: e.jsx("svg", {
              className: "w-6 h-6",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: e.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
              })
            })
          }),
          // Title and subtitle
          e.jsxs("div", {
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  e.jsx("h1", {
                    className: "text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight",
                    children: p
                  }),
                  e.jsxs("span", {
                    className: "text-[10px] uppercase font-bold px-2 py-0.5 rounded border bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
                    children: [b, " CURRICULUM"]
                  })
                ]
              }),
              e.jsx("p", {
                className: "text-slate-500 dark:text-slate-400 mt-1",
                children: "Select a topic below to access study notes or practice MCQs."
              })
            ]
          })
        ]
      }),

      // Topics grid
      e.jsx("div", {
        className: "grid grid-cols-1 gap-4",
        children: w.map((t, o) => {
          if (k(t)) {
            // Grouped topic (has parent + subtopics)
            const s = m.has(t.parent);
            return e.jsxs("div", {
              className: "space-y-2",
              children: [
                // Parent topic header (collapsible)
                e.jsxs("div", {
                  className: "glass-panel p-5 rounded-xl flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/60 dark:bg-slate-800/40 cursor-pointer",
                  onClick: () => u(t.parent),
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-4 flex-1",
                      children: [
                        e.jsx("div", {
                          className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20",
                          children: o + 1
                        }),
                        e.jsxs("div", {
                          className: "flex-1",
                          children: [
                            e.jsx("h3", {
                              className: "text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors",
                              children: t.parent
                            }),
                            e.jsxs("p", {
                              className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5",
                              children: [t.subtopics.length, " sub-topics"]
                            })
                          ]
                        })
                      ]
                    }),
                    // Chevron icon
                    e.jsx("svg", {
                      className: `w-5 h-5 text-slate-400 transition-transform ${s ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 9l-7 7-7-7"
                      })
                    })
                  ]
                }),

                // Expanded subtopics
                s && e.jsx("div", {
                  className: "ml-12 space-y-2 animate-in slide-in-from-top-2 fade-in duration-300",
                  children: t.subtopics.map((r, n) => {
                    if (k(r)) {
                      // Nested grouped subtopic (level 2)
                      const l = m.has(r.parent);
                      return e.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          // Nested parent header
                          e.jsxs("div", {
                            className: "glass-panel p-4 rounded-lg flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/40 dark:bg-slate-800/20 cursor-pointer",
                            onClick: () => u(r.parent),
                            children: [
                              e.jsxs("div", {
                                className: "flex items-center gap-3 flex-1",
                                children: [
                                  e.jsx("div", {
                                    className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5",
                                    children: n + 1
                                  }),
                                  e.jsx("h4", {
                                    className: "text-base font-medium text-slate-700 dark:text-slate-300",
                                    children: r.parent
                                  })
                                ]
                              }),
                              e.jsx("svg", {
                                className: `w-4 h-4 text-slate-400 transition-transform ${l ? "rotate-180" : ""}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M19 9l-7 7-7-7"
                                })
                              })
                            ]
                          }),

                          // Level 3 subtopics
                          l && e.jsx("div", {
                            className: "ml-8 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200",
                            children: r.subtopics.map((a, g) => {
                              const d = typeof a == "string" ? a : a.parent,
                                i = h(d);
                              return e.jsxs("div", {
                                className: "glass-panel p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/30 dark:bg-slate-800/10",
                                children: [
                                  e.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      e.jsx("div", {
                                        className: "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5",
                                        children: g + 1
                                      }),
                                      e.jsxs("h5", {
                                        className: "text-sm font-medium text-slate-700 dark:text-slate-300",
                                        children: [
                                          d,
                                          i && e.jsx("span", {
                                            className: "ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500",
                                            children: "PRO"
                                          })
                                        ]
                                      })
                                    ]
                                  }),
                                  // Action buttons
                                  e.jsxs("div", {
                                    className: "flex items-center gap-2 pl-7 md:pl-0",
                                    children: [
                                      // Read Notes button
                                      e.jsxs("button", {
                                        onClick: () => x(d),
                                        className: "flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-white/5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                                        children: [
                                          i
                                            ? e.jsx("svg", { /* lock icon */ })
                                            : e.jsx("svg", { /* document icon */ }),
                                          "Read Notes"
                                        ]
                                      }),
                                      // Solve MCQs button
                                      e.jsxs("button", {
                                        onClick: () => c(d),
                                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-lg ${i ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20"}`,
                                        children: [
                                          i
                                            ? e.jsx("svg", { /* lock icon */ })
                                            : e.jsx("svg", { /* clipboard-check icon */ }),
                                          "Solve MCQs"
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              }, g);
                            })
                          })
                        ]
                      }, n);
                    } else {
                      // Simple string subtopic (level 2)
                      const l = r,
                        a = h(l);
                      return e.jsxs("div", {
                        className: "glass-panel p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/40 dark:bg-slate-800/20",
                        children: [
                          e.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              e.jsx("div", {
                                className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5",
                                children: n + 1
                              }),
                              e.jsxs("h4", {
                                className: "text-base font-medium text-slate-700 dark:text-slate-300",
                                children: [
                                  l,
                                  a && e.jsx("span", {
                                    className: "ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500",
                                    children: "PRO"
                                  })
                                ]
                              })
                            ]
                          }),
                          // Action buttons (same pattern)
                          e.jsxs("div", {
                            className: "flex items-center gap-2 pl-9 md:pl-0",
                            children: [/* Read Notes + Solve MCQs buttons */]
                          })
                        ]
                      }, n);
                    }
                  })
                })
              ]
            }, o);
          } else {
            // Simple top-level topic (string)
            const s = t,
              r = h(s);
            return e.jsxs("div", {
              className: "glass-panel p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors group bg-white/60 dark:bg-slate-800/40",
              children: [
                e.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    e.jsx("div", {
                      className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20",
                      children: o + 1
                    }),
                    e.jsxs("h3", {
                      className: "text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors",
                      children: [
                        s,
                        r && e.jsx("span", {
                          className: "ml-2 text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500",
                          children: "PRO"
                        })
                      ]
                    })
                  ]
                }),
                // Action buttons
                e.jsxs("div", {
                  className: "flex items-center gap-3 pl-12 md:pl-0",
                  children: [/* Read Notes + Solve MCQs buttons */]
                })
              ]
            }, o);
          }
        })
      })
    ]
  });
};

export { M as default };

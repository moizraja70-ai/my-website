import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
  ChevronRight,
  Droplet,
  Eraser,
  Minus,
  MousePointer2,
  Pen,
  Plus,
  RotateCcw,
  Trash2,
  Type,
} from 'lucide-react';
import { MedicalSubject, ExamStream } from '../types';
import { getTopicData } from '../services/notesService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SummaryViewProps {
  isDarkMode: boolean;
  subject: MedicalSubject;
  topic?: string;
  stream: ExamStream;
  onStartQuiz: () => void;
  onBack: () => void;
  onPageContentChange: (content: string | undefined) => void;
  isAdmin: boolean;
}

interface Point {
  x: number;
  y: number;
  pressure?: number;
}

interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Stroke {
  tool: 'pen' | 'highlighter' | 'eraser' | 'rect-highlight';
  points: Point[];
  color: string;
  width: number;
  bbox?: BBox;
}

interface FreehandStroke {
  points: Point[];
  tool: string;
  color: string;
  size: number;
}

interface NoteData {
  content: string;
  keyPoints: string[];
  subject?: MedicalSubject;
}

type DrawingTool = 'pen' | 'highlighter' | 'eraser';
type StudyTool = 'select' | 'pen' | 'highlighter' | 'eraser';
type HighlightMode = 'text' | 'freehand';
type HighlightColor = 'yellow' | 'red';

// ---------------------------------------------------------------------------
// Content overrides cache (admin edits stored at build time)
// ---------------------------------------------------------------------------

const contentOverrides: Record<string, { content: string; keyPoints: string[] }> = {};

// ---------------------------------------------------------------------------
// Regex feature detection (lookbehind + unicode properties)
// ---------------------------------------------------------------------------

const supportsAdvancedRegex = (() => {
  try {
    new RegExp('(?<=a)b');
    new RegExp('\\p{P}', 'u');
    return true;
  } catch {
    return false;
  }
})();

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

function parseColor(color: string | undefined): { r: number; g: number; b: number } {
  if (!color) return { r: 255, g: 212, b: 0 };
  if (color.startsWith('#') && color.length >= 7) {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };
  }
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (match) {
    return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
  }
  return { r: 255, g: 212, b: 0 };
}

function getSelectionBg(color: string, isDarkMode: boolean): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${isDarkMode ? 0.2 : 0.12})`;
}

function getSelectionFg(_color?: string): string {
  return 'currentColor';
}

function getSelectionGlow(color: string, isDarkMode: boolean): string {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${isDarkMode ? 0.6 : 0.45})`;
}

function parseColorWithAlpha(
  color: string,
  alpha: number,
): { r: number; g: number; b: number; rgba: string } {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return { r, g, b, rgba: `rgba(${r}, ${g}, ${b}, ${alpha})` };
  }
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (match) {
    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);
    return { r, g, b, rgba: `rgba(${r}, ${g}, ${b}, ${alpha})` };
  }
  return { r: 255, g: 212, b: 0, rgba: `rgba(255, 212, 0, ${alpha})` };
}

// ---------------------------------------------------------------------------
// Custom SVG eraser cursor (data URL)
// ---------------------------------------------------------------------------

const ERASER_CURSOR =
  'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%20stroke%3D%22black%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M2%2016l9-9a2%202%200%200%201%203%200l6%206a2%202%200%200%201%200%203l-6%206H7l-5-5z%22/%3E%3Cpath%20d%3D%22M8%2021l6-6%22/%3E%3C/svg%3E") 12 12, auto';

// ---------------------------------------------------------------------------
// Color palette for study toolbar
// ---------------------------------------------------------------------------

const COLOR_PALETTE = [
  { name: 'Yellow', value: '#FCD34D', bg: 'bg-yellow-400' },
  { name: 'Mint', value: '#6EE7B7', bg: 'bg-emerald-300' },
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'White', value: '#FFFFFF', bg: 'bg-white', className: 'border border-slate-300' },
  { name: 'Black', value: '#111827', bg: 'bg-slate-900' },
];

// ---------------------------------------------------------------------------
// ImageLightbox
// ---------------------------------------------------------------------------

const ImageLightbox: React.FC<{
  src: string;
  alt?: string;
  onClose: () => void;
}> = ({ src, alt, onClose }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[101]"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
      <img
        src={src}
        alt={alt || 'Expanded view'}
        className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
      />
      {alt && (
        <p className="absolute bottom-[-3rem] left-0 right-0 text-center text-white/90 text-sm font-medium">
          {alt}
        </p>
      )}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// DrawingCanvas (pen / highlighter / eraser on top of content)
// ---------------------------------------------------------------------------

const DrawingCanvasInner: React.FC<{
  tool: DrawingTool;
  active: boolean;
  strokes: Stroke[];
  onStrokeComplete: (stroke: Stroke) => void;
  onEraseStroke: (index: number) => void;
  onStrokesUpdate: (strokes: Stroke[]) => void;
  color?: string;
  strokeWidth?: number;
  eraserSize?: number;
  isDarkMode?: boolean;
  highlightBlendMode?: string;
}> = ({
  tool,
  active,
  strokes,
  onStrokeComplete,
  onEraseStroke,
  onStrokesUpdate,
  color = '#ef4444',
  strokeWidth = 3,
  eraserSize = 30,
  isDarkMode = false,
  highlightBlendMode,
}) => {
    const mainCanvasRef = useRef<HTMLCanvasElement>(null);
    const activeCanvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isDrawing = useRef(false);
    const needsFullRedraw = useRef(false);
    const currentPoints = useRef<Point[]>([]);
    const lastPoint = useRef<Point | null>(null);
    const strokesRef = useRef<Stroke[]>([]);
    const lastPos = useRef<Point | null>(null);
    const lockDirection = useRef<'horizontal' | 'vertical' | null>(null);
    const lockOrigin = useRef<Point | null>(null);
    const gridIndex = useRef(new Map<string, Set<number>>());
    const CELL_SIZE = 100;
    const DPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Draw a single stroke onto a canvas context
    const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke | null) => {
      if (!stroke || !stroke.points || stroke.points.length < 1) return;
      const pts = stroke.points;

      // Rect highlights (text selection)
      if (stroke.tool === 'rect-highlight') {
        const isRed =
          stroke.color &&
          (stroke.color.includes('239') || stroke.color.includes('68') || stroke.color.includes('red'));
        const fillColor = stroke.color || (isRed ? '#FF3B3B' : '#FFD400');
        const { r, g, b } = parseColorWithAlpha(fillColor, 1);
        const baseAlpha = isDarkMode ? 0.28 : 0.14;
        const overlayAlpha = isDarkMode ? 0.4 : 0.2;

        ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply';
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.55)`;
        for (let i = 0; i < pts.length; i += 2) {
          if (pts[i + 1]) ctx.fillRect(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
        }

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${overlayAlpha})`;
        for (let i = 0; i < pts.length; i += 2) {
          if (pts[i + 1]) ctx.fillRect(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
        }

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalCompositeOperation = 'source-over';
        return;
      }

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'pen') {
        ctx.strokeStyle = stroke.color || '#ef4444';
        ctx.lineWidth = stroke.width || 3;
        ctx.globalCompositeOperation = 'source-over';
      } else if (stroke.tool === 'highlighter') {
        const isRed =
          stroke.color && (stroke.color.includes('red') || stroke.color.includes('255, 60'));
        const hlColor = stroke.color || (isRed ? '#FF3B3B' : '#FFD400');
        const hlAlpha = isDarkMode ? 0.32 : 0.12;
        const { r, g, b } = parseColorWithAlpha(hlColor, 1);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${hlAlpha})`;
        ctx.lineWidth = Math.max(stroke.width || 12, 9);
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply';
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
      } else if (stroke.tool === 'eraser') {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = stroke.width || 30;
        ctx.globalCompositeOperation = 'destination-out';
      }

      // Single-point dot
      if (pts.length === 1) {
        const pt = pts[0];
        const radius = Math.max((ctx.lineWidth || 3) / 2, 1);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.globalCompositeOperation = 'source-over';
        return;
      }

      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const cp = pts[i];
        const next = pts[i + 1];
        const mid = { x: (cp.x + next.x) / 2, y: (cp.y + next.y) / 2 };
        ctx.quadraticCurveTo(cp.x, cp.y, mid.x, mid.y);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.globalCompositeOperation = 'source-over';
    };

    // Build spatial grid index for eraser hit-testing
    const rebuildGrid = () => {
      gridIndex.current.clear();
      strokesRef.current.forEach((s, idx) => {
        if (!s) return;
        let box = s.bbox;
        if (!box && s.points && s.points.length > 0) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const p of s.points) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
          }
          box = { minX, minY, maxX, maxY };
          s.bbox = box;
        }
        if (!box) return;
        const x0 = Math.floor(box.minX / CELL_SIZE);
        const y0 = Math.floor(box.minY / CELL_SIZE);
        const x1 = Math.floor(box.maxX / CELL_SIZE);
        const y1 = Math.floor(box.maxY / CELL_SIZE);
        for (let cx = x0; cx <= x1; cx++) {
          for (let cy = y0; cy <= y1; cy++) {
            const key = `${cx},${cy}`;
            if (!gridIndex.current.has(key)) gridIndex.current.set(key, new Set());
            gridIndex.current.get(key)!.add(idx);
          }
        }
      });
    };

    // Redraw all committed strokes onto the main canvas
    const redrawMain = useCallback(() => {
      const canvas = mainCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
      strokesRef.current.forEach((s) => drawStroke(ctx, s));
    }, [DPR]);

    // Redraw active (in-progress) stroke onto the active canvas
    const redrawActive = useCallback(() => {
      const canvas = activeCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
      if (needsFullRedraw.current) {
        redrawMain();
        needsFullRedraw.current = false;
      }
      if (isDrawing.current && (tool === 'pen' || tool === 'highlighter') && currentPoints.current.length > 0) {
        drawStroke(ctx, { tool, points: currentPoints.current, color, width: strokeWidth });
      }
    }, [DPR, tool, color, strokeWidth]);

    // Sync strokes ref when prop changes
    useEffect(() => {
      strokesRef.current = (strokes || []).filter((s) => s != null);
      rebuildGrid();
      redrawMain();
    }, [strokes]);

    // Handle resize
    useEffect(() => {
      const wrapper = wrapperRef.current;
      const main = mainCanvasRef.current;
      const act = activeCanvasRef.current;
      if (!wrapper || !main || !act) return;

      const onResize = (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          [main, act].forEach((c) => {
            c.width = width * DPR;
            c.height = height * DPR;
            c.style.width = `${width}px`;
            c.style.height = `${height}px`;
            const ctx = c.getContext('2d');
            if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
          });
          redrawMain();
        }
      };

      const observer = new ResizeObserver(onResize);
      if (wrapper.parentElement) observer.observe(wrapper.parentElement);
      return () => observer.disconnect();
    }, [DPR, redrawMain]);

    // Reset when tool becomes inactive
    useEffect(() => {
      if (active) {
        console.log('DentEdge Pro-Drawing Engine 2.5 Active (Stable Turbo)');
        redrawMain();
      } else {
        isDrawing.current = false;
        needsFullRedraw.current = false;
        currentPoints.current = [];
        lastPoint.current = null;
        lockDirection.current = null;
        lockOrigin.current = null;
        lastPos.current = null;
      }
    }, [active, strokes, redrawMain]);

    const getCanvasPoint = (e: React.PointerEvent): Point | null => {
      const canvas = activeCanvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    // Eraser: find nearest stroke
    const findStrokeNear = (x: number, y: number): number => {
      const radius = eraserSize / 2 + 5;
      const radiusSq = radius * radius;
      const cx = Math.floor(x / CELL_SIZE);
      const cy = Math.floor(y / CELL_SIZE);
      const candidates = new Set<number>();
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const bucket = gridIndex.current.get(`${cx + dx},${cy + dy}`);
          if (bucket) bucket.forEach((idx) => candidates.add(idx));
        }
      }
      const sorted = Array.from(candidates).sort((a, b) => b - a);
      for (const idx of sorted) {
        const s = strokesRef.current[idx];
        if (!s || !s.points) continue;
        if (s.tool === 'rect-highlight') {
          for (let i = 0; i < s.points.length; i += 2) {
            if (!s.points[i + 1]) continue;
            const rx = s.points[i].x;
            const ry = s.points[i].y;
            const rw = s.points[i + 1].x;
            const rh = s.points[i + 1].y;
            const closestX = Math.max(rx, Math.min(x, rx + rw));
            const closestY = Math.max(ry, Math.min(y, ry + rh));
            const distX = x - closestX;
            const distY = y - closestY;
            if (distX * distX + distY * distY < radiusSq) return idx;
          }
        } else {
          const half = (s.width || 3) / 2;
          const checkRadius = radius + half;
          const checkSq = checkRadius * checkRadius;
          for (const pt of s.points) {
            const dx = x - pt.x;
            const dy = y - pt.y;
            if (dx * dx + dy * dy < checkSq) return idx;
          }
        }
      }
      return -1;
    };

    const eraseAt = (x: number, y: number) => {
      const idx = findStrokeNear(x, y);
      if (idx !== -1) {
        strokesRef.current = strokesRef.current.filter((_, i) => i !== idx);
        rebuildGrid();
        needsFullRedraw.current = true;
        if (onEraseStroke && !onStrokesUpdate) onEraseStroke(idx);
      }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      if (!active) return;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      isDrawing.current = true;
      const pt = getCanvasPoint(e);
      if (!pt) return;
      lastPos.current = pt;
      currentPoints.current = [pt];
      lastPoint.current = pt;
      if (tool === 'highlighter') {
        lockDirection.current = null;
        lockOrigin.current = pt;
      }
      if (tool === 'eraser') eraseAt(pt.x, pt.y);
      redrawActive();
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!active) return;
      const events = e.nativeEvent.getCoalescedEvents ? e.nativeEvent.getCoalescedEvents() : [e.nativeEvent];
      let needsRedraw = false;

      for (const ev of events) {
        const pt = getCanvasPoint(ev as unknown as React.PointerEvent);
        if (!pt || !isDrawing.current) continue;

        if (tool === 'eraser') {
          eraseAt(pt.x, pt.y);
          needsRedraw = true;
        } else if (tool === 'pen' || tool === 'highlighter') {
          let adjustedPt = pt;
          if (tool === 'highlighter' && lockOrigin.current) {
            if (!lockDirection.current) {
              const dx = Math.abs(pt.x - lockOrigin.current.x);
              const dy = Math.abs(pt.y - lockOrigin.current.y);
              if (dx > 3 || dy > 3) {
                lockDirection.current = dx >= dy ? 'horizontal' : 'vertical';
              }
            }
            if (lockDirection.current === 'horizontal') {
              adjustedPt = { x: pt.x, y: lockOrigin.current.y };
            } else if (lockDirection.current === 'vertical') {
              adjustedPt = { x: lockOrigin.current.x, y: pt.y };
            }
          }
          const last = lastPoint.current;
          const dist = last
            ? Math.pow(adjustedPt.x - last.x, 2) + Math.pow(adjustedPt.y - last.y, 2)
            : 100;
          if (dist > 4) {
            currentPoints.current.push(adjustedPt);
            lastPoint.current = adjustedPt;
            needsRedraw = true;
          }
        }
      }
      if (needsRedraw) redrawActive();
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDrawing.current) return;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch { /* ignore */ }

      isDrawing.current = false;

      if (currentPoints.current.length > 0 && (tool === 'pen' || tool === 'highlighter')) {
        const pts = [...currentPoints.current];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of pts) {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
        onStrokeComplete({
          tool,
          points: pts,
          color,
          width: strokeWidth,
          bbox: { minX, minY, maxX, maxY },
        });
      }

      if (needsFullRedraw.current && onStrokesUpdate) {
        onStrokesUpdate([...strokesRef.current]);
        needsFullRedraw.current = false;
      }

      currentPoints.current = [];
      lastPoint.current = null;
      lockDirection.current = null;
      lockOrigin.current = null;
      redrawActive();
    };

    return (
      <div
        ref={wrapperRef}
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <canvas
          ref={mainCanvasRef}
          className="absolute inset-0 touch-none pointer-events-none"
          style={{
            mixBlendMode:
              tool === 'highlighter'
                ? (highlightBlendMode as any) || (isDarkMode ? 'screen' : 'multiply')
                : isDarkMode
                  ? 'multiply'
                  : 'screen',
          }}
        />
        <canvas
          ref={activeCanvasRef}
          className={`absolute inset-0 touch-none ${active && (tool === 'pen' || tool === 'eraser') ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          style={{
            cursor: tool === 'eraser' ? ERASER_CURSOR : 'crosshair',
            mixBlendMode:
              tool === 'highlighter'
                ? (highlightBlendMode as any) || (isDarkMode ? 'screen' : 'multiply')
                : isDarkMode
                  ? 'multiply'
                  : 'screen',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
    );
  };

const DrawingCanvas = React.memo(DrawingCanvasInner);

// ---------------------------------------------------------------------------
// FontSizeControl (floating T button + slider bar)
// ---------------------------------------------------------------------------

const FontSizeControl: React.FC<{
  fontSize: number;
  setFontSize: (size: number) => void;
  min?: number;
  max?: number;
}> = ({ fontSize, setFontSize, min = 14, max = 32 }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setExpanded(false);
    };
    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [expanded]);

  return (
    <div ref={ref} className="fixed top-36 right-8 z-[100] isolate">
      <style>{`
        .t-fab-shadow { box-shadow: 0 18px 50px rgba(0,0,0,0.55); }
        .slider-bar-shadow { box-shadow: 0 18px 50px rgba(0,0,0,0.55); }
        .gradient-chip { background: linear-gradient(180deg, #111a2a, #0f1726); }
      `}</style>
      <div className="relative">
        {/* Collapsed button */}
        <button
          onClick={() => setExpanded(true)}
          className={`
            w-[54px] h-[54px] rounded-full border border-white/15 text-white/90
            grid place-items-center cursor-pointer t-fab-shadow gradient-chip
            transition-all duration-300 ease-out
            ${expanded ? 'opacity-0 scale-90 pointer-events-none translate-y-[-6px]' : 'opacity-100 scale-100 translate-y-0'}
          `}
          aria-label="Open text size control"
        >
          <span className="font-bold text-lg tracking-wide">T</span>
        </button>

        {/* Expanded slider */}
        <div
          className={`
            absolute top-0 right-0
            h-[54px] rounded-full border border-white/15
            flex items-center gap-3 px-4 overflow-hidden slider-bar-shadow gradient-chip
            transition-all duration-300 ease-out origin-right
            ${expanded ? 'w-[320px] opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'w-[54px] opacity-0 scale-90 translate-y-[-6px] pointer-events-none'}
          `}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setFontSize(Math.max(min, fontSize - 2)); }}
            className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
          >
            <Minus size={16} />
          </button>
          <input
            type="range"
            min={min}
            max={max}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 h-1.5 bg-white/15 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
          <button
            onClick={(e) => { e.stopPropagation(); setFontSize(Math.min(max, fontSize + 2)); }}
            className="w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
          >
            <Plus size={16} />
          </button>
          <div className="flex items-center gap-1 text-white/90 flex-shrink-0 pl-1">
            <Type size={18} />
            <div className="w-px h-4 bg-white/15 mx-2" />
            <span className="text-xs font-mono text-white/65 tabular-nums w-8 text-right">
              {fontSize}px
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// FreehandDrawingLayer (used inside StudyModeOverlay)
// ---------------------------------------------------------------------------

const FreehandDrawingLayer: React.FC<{
  currentTool: StudyTool;
  strokes: FreehandStroke[];
  setStrokes: (strokes: FreehandStroke[]) => void;
  currentColor?: string;
  isDarkMode?: boolean;
}> = ({ currentTool, strokes, setStrokes, currentColor = '#FCD34D', isDarkMode = false }) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const activeCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const currentStroke = useRef<FreehandStroke | null>(null);
  const strokesRef = useRef(strokes);
  const lastPoint = useRef<Point | null>(null);
  const lockDir = useRef<'horizontal' | 'vertical' | null>(null);
  const lockOrigin = useRef<Point | null>(null);

  const toolSettings: Record<string, { color: string; size: number }> = {
    select: { color: currentColor, size: 0 },
    pen: { color: currentColor, size: 3 },
    highlighter: { color: currentColor, size: 14 },
    eraser: { color: 'rgb(0,0,0)', size: 30 },
  };

  const drawFreehandStroke = (ctx: CanvasRenderingContext2D, s: FreehandStroke) => {
    if (s.points.length < 1) return;
    const { points, tool, color: c, size } = s;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (tool === 'highlighter') {
      ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'multiply';
      const alpha = isDarkMode ? 0.32 : 0.12;
      const { r, g, b } = parseColorWithAlpha(c, 1);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = c;
    }

    if (points.length === 1) {
      const pt = points[0];
      const radius = Math.max(size / 2, 1);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fillStyle =
        tool === 'eraser' ? 'rgba(0,0,0,1)' : tool === 'highlighter' ? ctx.strokeStyle : c;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.globalCompositeOperation = 'source-over';
      return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const cp = points[i];
      const next = points[i + 1];
      const mid = { x: (cp.x + next.x) / 2, y: (cp.y + next.y) / 2 };
      ctx.quadraticCurveTo(cp.x, cp.y, mid.x, mid.y);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.globalCompositeOperation = 'source-over';
  };

  const redrawMain = useCallback(() => {
    if (!mainCanvasRef.current) return;
    const ctx = mainCanvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
    strokesRef.current.forEach((s) => drawFreehandStroke(ctx, s));
  }, [isDarkMode]);

  const clearActive = useCallback(() => {
    if (!activeCanvasRef.current) return;
    const ctx = activeCanvasRef.current.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, activeCanvasRef.current.width, activeCanvasRef.current.height);
  }, [isDarkMode]);

  // Resize handling
  useEffect(() => {
    const onResize = () => {
      if (!mainCanvasRef.current || !activeCanvasRef.current || !wrapperRef.current) return;
      const w = wrapperRef.current;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      [mainCanvasRef.current, activeCanvasRef.current].forEach((c) => {
        c.width = w.clientWidth * dpr;
        c.height = w.clientHeight * dpr;
        c.style.width = `${w.clientWidth}px`;
        c.style.height = `${w.clientHeight}px`;
        const ctx = c.getContext('2d');
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
      redrawMain();
      clearActive();
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [redrawMain, clearActive]);

  useEffect(() => {
    strokesRef.current = strokes;
    redrawMain();
    clearActive();
  }, [strokes, redrawMain, clearActive]);

  const getPoint = (e: PointerEvent): Point => {
    const rect = activeCanvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, pressure: e.pressure };
  };

  const handleDown = (e: React.PointerEvent) => {
    if (!activeCanvasRef.current || currentTool === 'select') return;
    activeCanvasRef.current.setPointerCapture(e.pointerId);
    const pt = getPoint(e.nativeEvent);
    const settings = toolSettings[currentTool];
    isDrawing.current = true;
    currentStroke.current = {
      points: [pt],
      tool: currentTool,
      color: settings.color,
      size: settings.size,
    };
    lastPoint.current = pt;
    if (currentTool === 'highlighter') {
      lockDir.current = null;
      lockOrigin.current = pt;
    }
    const ctx =
      currentTool === 'eraser'
        ? mainCanvasRef.current?.getContext('2d')
        : activeCanvasRef.current?.getContext('2d');
    if (ctx && currentStroke.current) drawFreehandStroke(ctx, currentStroke.current);
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!isDrawing.current || !activeCanvasRef.current || currentTool === 'select') return;
    const events = e.nativeEvent.getCoalescedEvents
      ? e.nativeEvent.getCoalescedEvents()
      : [e.nativeEvent];
    const stroke = currentStroke.current;
    if (!stroke) return;

    for (const ev of events) {
      const pt = getPoint(ev);
      let adjusted = pt;
      if (currentTool === 'highlighter' && lockOrigin.current) {
        if (!lockDir.current) {
          const dx = Math.abs(pt.x - lockOrigin.current.x);
          const dy = Math.abs(pt.y - lockOrigin.current.y);
          if (dx > 3 || dy > 3) lockDir.current = dx >= dy ? 'horizontal' : 'vertical';
        }
        if (lockDir.current === 'horizontal') adjusted = { x: pt.x, y: lockOrigin.current.y };
        else if (lockDir.current === 'vertical') adjusted = { x: lockOrigin.current.x, y: pt.y };
      }
      const last = lastPoint.current;
      if (last) {
        const dx = adjusted.x - last.x;
        const dy = adjusted.y - last.y;
        if (dx * dx + dy * dy < 4) continue;
      }
      stroke.points.push(adjusted);
      const ctx =
        currentTool === 'eraser'
          ? mainCanvasRef.current?.getContext('2d')
          : activeCanvasRef.current?.getContext('2d');
      if (ctx && last) drawFreehandStroke(ctx, { ...stroke, points: [last, adjusted] });
      lastPoint.current = adjusted;
    }
  };

  const handleUp = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    if (activeCanvasRef.current) activeCanvasRef.current.releasePointerCapture(e.pointerId);
    isDrawing.current = false;
    const stroke = currentStroke.current;
    if (stroke) {
      const updated = [...strokesRef.current, stroke];
      strokesRef.current = updated;
      setStrokes(updated);
    }
    currentStroke.current = null;
    lastPoint.current = null;
    lockDir.current = null;
    lockOrigin.current = null;
    redrawMain();
    clearActive();
  };

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full"
      style={{
        cursor: currentTool === 'select' ? 'default' : currentTool === 'eraser' ? ERASER_CURSOR : 'crosshair',
      }}
    >
      <canvas ref={mainCanvasRef} className="absolute inset-0 block pointer-events-none" />
      <canvas
        ref={activeCanvasRef}
        className="absolute inset-0 block touch-none"
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerLeave={handleUp}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// StudyModeOverlay (wraps FreehandDrawingLayer)
// ---------------------------------------------------------------------------

const StudyModeOverlay: React.FC<{
  isActive: boolean;
  currentTool: StudyTool;
  highlightMode?: HighlightMode;
  strokes: FreehandStroke[];
  setStrokes: (strokes: FreehandStroke[]) => void;
  currentColor: string;
  isDarkMode?: boolean;
}> = ({ isActive, currentTool, highlightMode = 'freehand', strokes, setStrokes, currentColor, isDarkMode = false }) => {
  if (!isActive) return null;
  return (
    <div className="absolute inset-0 z-[200] pointer-events-none">
      <div
        className={`absolute inset-0 ${currentTool === 'select' || (currentTool === 'highlighter' && highlightMode === 'text')
            ? 'pointer-events-none'
            : 'pointer-events-auto'
          }`}
      >
        <FreehandDrawingLayer
          currentTool={currentTool}
          strokes={strokes}
          setStrokes={setStrokes}
          currentColor={currentColor}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// StudyToolbar (floating toolbar in study mode)
// ---------------------------------------------------------------------------

const StudyToolbar: React.FC<{
  currentTool: StudyTool;
  setTool: (tool: StudyTool) => void;
  onUndo: () => void;
  onClear: () => void;
  canUndo: boolean;
  onClose?: () => void;
  currentColor?: string;
  onColorChange?: (color: string) => void;
  highlightMode?: HighlightMode;
  onHighlightModeChange?: (mode: HighlightMode) => void;
}> = ({
  currentTool,
  setTool,
  onUndo,
  onClear,
  canUndo,
  currentColor = '#FCD34D',
  onColorChange,
  highlightMode = 'freehand',
  onHighlightModeChange,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const isEraser = currentTool === 'eraser';

    const toolButton = (t: StudyTool) => (e: React.PointerEvent) => {
      e.preventDefault();
      setTool(t);
    };
    const colorButton = (c: string) => (e: React.PointerEvent) => {
      e.preventDefault();
      onColorChange?.(c);
    };
    const modeButton = (m: HighlightMode) => (e: React.PointerEvent) => {
      e.preventDefault();
      onHighlightModeChange?.(m);
    };

    if (collapsed) {
      return (
        <button
          onPointerDown={(e) => { e.preventDefault(); setCollapsed(false); }}
          onClick={() => setCollapsed(false)}
          className="w-12 h-12 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-105 transition-transform"
          title="Open toolbar"
        >
          <Pen size={18} strokeWidth={2} />
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2 shadow-xl backdrop-blur-xl touch-manipulation">
        {/* Collapse */}
        <button
          onPointerDown={(e) => { e.preventDefault(); setCollapsed(true); }}
          onClick={() => setCollapsed(true)}
          className="p-2 rounded-full transition-all text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Collapse toolbar"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        {/* Select */}
        <button
          onPointerDown={toolButton('select')}
          onClick={() => setTool('select')}
          className={`p-2 rounded-full transition-all ${currentTool === 'select' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          title="Select"
        >
          <MousePointer2 size={18} strokeWidth={2} />
        </button>

        {/* Pen */}
        <button
          onPointerDown={toolButton('pen')}
          onClick={() => setTool('pen')}
          className={`p-2 rounded-full transition-all ${currentTool === 'pen' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          title="Pen"
        >
          <Pen size={18} strokeWidth={2} />
        </button>

        {/* Eraser */}
        <button
          onPointerDown={toolButton('eraser')}
          onClick={() => setTool('eraser')}
          className={`p-2 rounded-full transition-all ${currentTool === 'eraser' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          title="Eraser"
        >
          <Eraser size={18} strokeWidth={2} className={`transition-transform ${isEraser ? 'scale-125' : 'scale-100'}`} />
        </button>

        {/* Highlighter */}
        <button
          onPointerDown={toolButton('highlighter')}
          onClick={() => setTool('highlighter')}
          className={`p-2 rounded-full transition-all ${currentTool === 'highlighter' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          title="Highlighter"
        >
          <Minus size={18} strokeWidth={3} />
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Highlight mode (text vs freehand) */}
        {currentTool === 'highlighter' && onHighlightModeChange && (
          <>
            <div className="flex items-center gap-1">
              <button
                onPointerDown={modeButton('text')}
                onClick={() => onHighlightModeChange('text')}
                className={`p-2 rounded-full transition-all ${highlightMode === 'text' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                title="Text highlight"
              >
                <Type size={16} strokeWidth={2} />
              </button>
              <button
                onPointerDown={modeButton('freehand')}
                onClick={() => onHighlightModeChange('freehand')}
                className={`p-2 rounded-full transition-all ${highlightMode === 'freehand' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                title="Freehand highlight"
              >
                <Pen size={16} strokeWidth={2} />
              </button>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
          </>
        )}

        {/* Color palette */}
        <div className="flex items-center gap-1.5">
          {COLOR_PALETTE.map((c) => (
            <button
              key={c.value}
              onPointerDown={colorButton(c.value)}
              onClick={() => onColorChange?.(c.value)}
              className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${c.bg} ${c.className || ''} ${currentColor === c.value
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                  : 'hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600'
                }`}
              title={c.name}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Ink icon */}
        <div className="p-2 rounded-full text-slate-500 dark:text-slate-400">
          <Droplet size={18} strokeWidth={2} />
        </div>

        {/* Undo */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-full transition-all ${canUndo ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'}`}
          title="Undo"
        >
          <RotateCcw size={18} strokeWidth={2} />
        </button>

        {/* Clear */}
        <button
          onClick={onClear}
          className="p-2 rounded-full transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Clear All"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    );
  };

// ---------------------------------------------------------------------------
// AdminEditToolbar
// ---------------------------------------------------------------------------

const AdminEditToolbar: React.FC<{
  onInsert: (prefix: string, suffix?: string) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({ onInsert, onSave, onCancel }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      const markdown = `![${file.name}](${dataUrl})`;
      onInsert(markdown);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="sticky top-4 z-50 mb-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 p-3 flex flex-wrap items-center gap-2 animate-in slide-in-from-top-4">
      {/* Text formatting */}
      <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2 mr-1">
        <button onClick={() => onInsert('**', '**')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold" title="Bold">B</button>
        <button onClick={() => onInsert('*', '*')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 italic" title="Italic">I</button>
        <button onClick={() => onInsert('<span style="color: red">', '</span>')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-red-500 font-bold" title="Red Text">A</button>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2 mr-1">
        <button onClick={() => onInsert('# ')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-lg" title="Heading 1">H1</button>
        <button onClick={() => onInsert('## ')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-base" title="Heading 2">H2</button>
        <button onClick={() => onInsert('### ')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-sm" title="Heading 3">H3</button>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2 mr-1">
        <button onClick={() => onInsert('- ')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300" title="Bullet List">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button onClick={() => onInsert('1. ')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300" title="Numbered List">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h12M7 12h12M7 17h12M3 7h1m-1 5h1m-1 5h1" />
          </svg>
        </button>
      </div>

      {/* Image upload */}
      <div className="flex items-center gap-1 border-r border-slate-200 dark:border-white/10 pr-2 mr-1">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300" title="Upload Image">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Save / Cancel */}
      <div className="ml-auto flex items-center gap-2">
        <button onClick={onCancel} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors">Cancel</button>
        <button onClick={onSave} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">Save Changes</button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MarkdownRenderer (memoized ReactMarkdown with custom components)
// ---------------------------------------------------------------------------

interface MarkdownRendererProps {
  content: string;
  setSelectedImage: (src: string | null) => void;
  isGIC: boolean;
}

const MarkdownRenderer = React.memo<MarkdownRendererProps>(
  ({ content, setSelectedImage, isGIC }) => (
    <ReactMarkdown
      remarkPlugins={supportsAdvancedRegex ? [remarkGfm] : []}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ node, ...props }) => (
          <div className="my-10 relative group select-none">
            {/* Transparent overlay to block right-click saving */}
            <div className="absolute inset-0 z-40 bg-transparent" onContextMenu={(e) => e.preventDefault()} />
            {/* Download button for impression summary image */}
            {props.src && props.src.includes('impression_downloadable_summary.png') && (
              <a
                href={props.src}
                download="Impression_Materials_Summary.png"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-bold shadow-lg z-[60] hover:bg-white dark:hover:bg-slate-700 transition-colors flex items-center gap-2 pointer-events-auto cursor-pointer border border-slate-200 dark:border-white/10"
                title="Download Summary Table"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            )}
            <img
              {...props}
              onClick={() => props.src && setSelectedImage(props.src)}
              className="rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 w-full max-w-[800px] mx-auto object-contain transition-transform hover:scale-[1.01] duration-500 cursor-zoom-in relative z-30 select-none pointer-events-auto bg-white"
              draggable={false}
              alt={props.alt || 'Medical Diagram'}
              style={{ display: 'block' }}
            />
            {props.alt && (
              <p className="text-center text-base text-slate-500 dark:text-slate-400 mt-4 font-sans font-medium">
                {props.alt}
              </p>
            )}
          </div>
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6 border border-slate-300 dark:border-slate-600 rounded-lg">
            <table {...props} className="min-w-full text-left border-collapse bg-white dark:bg-slate-900" />
          </div>
        ),
        thead: ({ node, ...props }) => <thead {...props} className="bg-slate-100 dark:bg-slate-800" />,
        th: ({ node, ...props }) => (
          <th {...props} className="px-6 py-4 border border-slate-300 dark:border-slate-600 font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 text-sm md:text-base align-top" />
        ),
        td: ({ node, ...props }) => (
          <td {...props} className={`px-6 py-4 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 align-top ${isGIC ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`} />
        ),
        h1: ({ node, ...props }) => (
          <h1 {...props} className="medical-serif text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white tracking-tight" />
        ),
        h2: ({ node, ...props }) => (
          <div className="mt-16 mb-8 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent" />
            <h2 {...props} className="medical-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" />
          </div>
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="medical-serif text-xl md:text-2xl font-bold mt-10 mb-5 text-slate-800 dark:text-slate-200" />
        ),
        ol: ({ node, ...props }) => <ol {...props} className="space-y-3 my-6 list-decimal pl-8" />,
        ul: ({ node, ...props }) => <ul {...props} className="space-y-3 my-6 list-disc pl-8 marker:text-slate-500" />,
        strong: ({ node, ...props }) => <strong {...props} className="font-bold text-slate-900 dark:text-white" />,
        hr: () => (
          <div className="my-14 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent" />
        ),
        iframe: ({ node, ...props }) => (
          <div className="my-10 relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10">
            <iframe {...props} className="absolute inset-0 w-full h-full" />
          </div>
        ),
        video: ({ node, ...props }) => (
          <div className="my-10 relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10">
            <video {...props} className="w-full" controls />
          </div>
        ),
        p: ({ node, ...props }) => (
          <div {...props} className={isGIC ? 'text-lg md:text-xl leading-relaxed mb-6' : 'mb-4'} />
        ),
        li: ({ node, ...props }) => (
          <li {...props} className={isGIC ? 'text-lg md:text-xl leading-relaxed mb-3' : 'mb-2'} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  ),
  (prev, next) => prev.content === next.content && prev.isGIC === next.isGIC,
);

MarkdownRenderer.displayName = 'MarkdownRenderer';

// ---------------------------------------------------------------------------
// SummaryView (main component)
// ---------------------------------------------------------------------------

const SummaryView: React.FC<SummaryViewProps> = ({
  subject,
  topic,
  stream,
  onStartQuiz,
  onBack,
  isDarkMode,
  onPageContentChange,
  isAdmin,
}) => {
  // ----- Note data state -----
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ----- Drawing / annotation state (persistent pen strokes) -----
  const [drawingActive, setDrawingActive] = useState(false);
  const [drawingTool, setDrawingTool] = useState<DrawingTool>('pen');
  const [drawingStrokes, setDrawingStrokes] = useState<Stroke[]>([]);
  const [highlightColor, setHighlightColor] = useState<HighlightColor>('yellow');
  const [penColor, setPenColor] = useState('#ef4444');
  const [penWidth, setPenWidth] = useState(3);
  const [eraserSize, setEraserSize] = useState(30);
  const [fontSize, setFontSize] = useState(18);

  // ----- Study mode state (floating toolbar drawing) -----
  const [studyModeActive, setStudyModeActive] = useState(false);
  const [studyTool, setStudyTool] = useState<StudyTool>('pen');
  const [studyStrokes, setStudyStrokes] = useState<FreehandStroke[]>([]);
  const [studyColor, setStudyColor] = useState('#FCD34D');
  const [highlightMode, setHighlightMode] = useState<HighlightMode>('freehand');

  // ----- Admin edit state -----
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editKeyPoints, setEditKeyPoints] = useState<string[]>([]);

  // ----- Derived state -----
  const isTextHighlightMode =
    studyModeActive && studyTool === 'highlighter' && highlightMode === 'text';
  const isHighlighting =
    (drawingActive && drawingTool === 'highlighter') || isTextHighlightMode;

  const activeHighlightColor = isTextHighlightMode
    ? studyColor
    : highlightColor === 'yellow'
      ? '#FFD400'
      : '#FF3B3B';

  const selectionBg = getSelectionBg(activeHighlightColor, !!isDarkMode);
  const selectionFg = getSelectionFg();
  const selectionGlow = getSelectionGlow(activeHighlightColor, !!isDarkMode);

  const selectionStyles: React.CSSProperties | undefined = isHighlighting
    ? {
      '--selection-bg': selectionBg,
      '--selection-fg': selectionFg,
      '--selection-glow': selectionGlow,
    } as React.CSSProperties
    : undefined;

  const rectHighlightCount = useMemo(
    () => drawingStrokes.filter((s) => s.tool === 'rect-highlight').length,
    [drawingStrokes],
  );

  // ----- LocalStorage key for persistent study marks -----
  const storageKey = `dentedge_study_v1_${subject}_${topic || 'main'}`;

  // Wrapper to update drawing strokes and optionally clear storage
  const updateDrawingStrokes = (updater: (prev: Stroke[]) => Stroke[]) => {
    setDrawingStrokes((prev) => {
      const next = updater(prev);
      if (next.length === 0) {
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
      }
      return next;
    });
  };

  // Undo last rect-highlight
  const undoRectHighlight = () => {
    updateDrawingStrokes((prev) => {
      const reversedIdx = [...prev].reverse().findIndex((s) => s.tool === 'rect-highlight');
      if (reversedIdx === -1) return prev;
      const actualIdx = prev.length - 1 - reversedIdx;
      return prev.filter((_, i) => i !== actualIdx);
    });
  };

  // Clear all rect-highlights
  const clearRectHighlights = () => {
    updateDrawingStrokes((prev) => prev.filter((s) => s.tool !== 'rect-highlight'));
  };

  // Undo / clear for study mode or text highlight mode
  const handleUndo = isTextHighlightMode
    ? undoRectHighlight
    : () => setStudyStrokes((prev) => prev.slice(0, -1));

  const handleClear = isTextHighlightMode
    ? clearRectHighlights
    : () => setStudyStrokes([]);

  const canUndo = isTextHighlightMode ? rectHighlightCount > 0 : studyStrokes.length > 0;

  // ----- Load saved study strokes from localStorage -----
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const { savedStrokes } = JSON.parse(saved);
        if (savedStrokes) setDrawingStrokes(savedStrokes);
      } catch (err) {
        console.error('Failed to parse saved study data', err);
      }
    }
  }, [storageKey]);

  // ----- Persist study strokes to localStorage -----
  useEffect(() => {
    if (drawingStrokes.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify({ savedStrokes: drawingStrokes }));
    }
  }, [drawingStrokes, storageKey]);

  // ----- Text selection highlighting (mouseup / touchend) -----
  useEffect(() => {
    const handleSelectionEnd = () => {
      if (!isHighlighting) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      if (sel.toString().trim().length <= 2) return;

      const contentArea = document.getElementById('content-area');
      if (!contentArea) return;
      const containerRect = contentArea.getBoundingClientRect();
      const clientRects = range.getClientRects();
      const points: Point[] = [];

      for (let i = 0; i < clientRects.length; i++) {
        const r = clientRects[i];
        points.push({ x: r.left - containerRect.left, y: r.top - containerRect.top });
        points.push({ x: r.width, y: r.height });
      }

      if (points.length > 0) {
        const rectStroke: Stroke = {
          tool: 'rect-highlight',
          points,
          color: activeHighlightColor,
          width: 0,
        };
        setDrawingStrokes((prev) => [...prev, rectStroke]);
        setTimeout(() => {
          window.getSelection()?.removeAllRanges();
        }, 100);
      }
    };

    document.addEventListener('mouseup', handleSelectionEnd);
    document.addEventListener('touchend', handleSelectionEnd);
    return () => {
      document.removeEventListener('mouseup', handleSelectionEnd);
      document.removeEventListener('touchend', handleSelectionEnd);
    };
  }, [isHighlighting, activeHighlightColor]);

  // ----- Load note data -----
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const withTimeout = <T,>(promise: Promise<T>, ms = 12000): Promise<T> =>
          Promise.race([
            promise,
            new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Notes load timeout after ${ms}ms`)), ms)),
          ]);

        const data = await withTimeout(getTopicData(subject, stream, topic), 12000);
        const overrideKey = `${subject}|${topic || ''}`;

        // Check for local admin edits first
        const localEdit = localStorage.getItem(`dentedge_edit_${overrideKey}`);
        if (localEdit) {
          try {
            const parsed = JSON.parse(localEdit);
            data.content = parsed.content;
            data.keyPoints = parsed.keyPoints;
          } catch (err) {
            console.error('Failed to parse localStorage override', err);
          }
        } else if (overrideKey in contentOverrides) {
          const override = contentOverrides[overrideKey];
          if (override && 'content' in override && 'keyPoints' in override) {
            data.content = override.content;
            data.keyPoints = override.keyPoints;
          }
        }

        if (!cancelled) {
          setNoteData(data);
          setContentReady(false);
          onPageContentChange?.(data?.content);
        }
      } catch (err) {
        console.error('Failed to load summary', err);
        if (!cancelled) {
          setNoteData({
            content: `# ${topic || subject}\n\nCould not load notes right now. Please retry in a few seconds.`,
            keyPoints: [],
            subject,
          });
          setContentReady(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subject, stream, topic]);

  // ----- Deferred content render (idle callback) -----
  useEffect(() => {
    if (!noteData) return;
    let cancelled = false;
    const show = () => {
      if (!cancelled) setContentReady(true);
    };

    // Use a simple timeout to avoid requestIdleCallback stalling on heavy content
    const timer = window.setTimeout(show, 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [noteData]);

  // ----- Admin edit helpers -----
  const overrideKey = `${subject}|${topic || ''}`;

  const startEditing = () => {
    if (!noteData) return;
    setEditContent(noteData.content);
    setEditKeyPoints([...noteData.keyPoints]);
    setIsEditing(true);
  };

  const handleInsert = (prefix: string, suffix?: string) => {
    const textarea = document.getElementById('admin-edit-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (suffix) {
      setEditContent((prev) => prev.slice(0, start) + prefix + prev.slice(start, end) + suffix + prev.slice(end));
      requestAnimationFrame(() => {
        textarea.selectionStart = start + prefix.length;
        textarea.selectionEnd = start + prefix.length + (end - start);
        textarea.focus();
      });
    } else {
      setEditContent((prev) => prev.slice(0, start) + prefix + prev.slice(end));
      requestAnimationFrame(() => {
        textarea.selectionStart = start + prefix.length;
        textarea.selectionEnd = start + prefix.length;
        textarea.focus();
      });
    }
  };

  const saveEdits = () => {
    localStorage.setItem(
      `dentedge_edit_${overrideKey}`,
      JSON.stringify({ content: editContent, keyPoints: editKeyPoints }),
    );
    if (noteData) {
      setNoteData({ ...noteData, content: editContent, keyPoints: editKeyPoints });
    }
    setIsEditing(false);
  };

  const cancelEditing = () => setIsEditing(false);

  const exportOverrides = () => {
    const allOverrides: Record<string, any> = { ...contentOverrides };
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('dentedge_edit_')) {
        try {
          allOverrides[key.replace('dentedge_edit_', '')] = JSON.parse(localStorage.getItem(key)!);
        } catch (err) {
          console.error(`Failed to parse localStorage key ${key}`, err);
        }
      }
    }
    const blob = new Blob([JSON.stringify(allOverrides, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contentOverrides.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // =====================================================================
  // RENDER
  // =====================================================================

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500" />
        <p className="mt-4 font-bold text-slate-500">Loading Notes...</p>
      </div>
    );
  }

  // Error state
  if (!noteData) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-24 px-4 sm:px-6 relative">
      {/* ---- Header ---- */}
      <div className="flex items-center gap-6 mb-10 py-4 justify-between border-b dark:border-white/10">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold dark:text-white">{topic || subject}</h1>
        </div>

        {/* Admin edit / export buttons */}
        {isAdmin && !isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={startEditing}
              className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title="Edit content"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={exportOverrides}
              className="p-2 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              title="Export all overrides for deploy"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ---- Main grid ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
        {/* Content column */}
        <div className="lg:col-span-9">
          {isEditing ? (
            /* Admin editor */
            <section className="p-0 rounded-none bg-transparent border-none shadow-none relative">
              <div className="mb-4">
                <AdminEditToolbar onInsert={handleInsert} onSave={saveEdits} onCancel={cancelEditing} />
              </div>
              <textarea
                id="admin-edit-textarea"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-[650px] p-6 text-slate-800 dark:text-slate-100 leading-8 text-base bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Edit content here..."
              />
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Key Points
                </label>
                <textarea
                  value={editKeyPoints.join('\n')}
                  onChange={(e) => setEditKeyPoints(e.target.value.split('\n').filter(Boolean))}
                  className="w-full h-[140px] p-4 text-slate-800 dark:text-slate-100 leading-7 text-base bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="One key point per line..."
                />
              </div>
            </section>
          ) : (
            /* Notes content panel */
            <section className="glass-panel p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-black border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none relative">
              <div className="relative" id="content-area">
                {/* Drawing canvas overlay */}
                <DrawingCanvas
                  tool={drawingActive ? drawingTool : 'highlighter'}
                  active={drawingActive || isHighlighting}
                  strokes={drawingStrokes}
                  onStrokeComplete={(s) => setDrawingStrokes((prev) => [...prev, s])}
                  onEraseStroke={(idx) => setDrawingStrokes((prev) => prev.filter((_, i) => i !== idx))}
                  onStrokesUpdate={(s) => setDrawingStrokes(s)}
                  color={penColor}
                  strokeWidth={penWidth}
                  eraserSize={eraserSize}
                  highlightBlendMode={isTextHighlightMode ? 'screen' : undefined}
                  isDarkMode={isDarkMode}
                />

                {/* Markdown content */}
                {contentReady ? (
                  <div
                    className={`prose-sm prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-7 md:leading-8 ${isHighlighting ? 'allow-selection cursor-text' : 'select-none'
                      }`}
                    style={{ fontSize: `${fontSize}px`, ...(selectionStyles || {}) }}
                    onContextMenu={(e) => e.preventDefault()}
                    onCopy={(e) => {
                      if (isHighlighting) {
                        e.preventDefault();
                        alert('Content copying is disabled to protect medical data.');
                      }
                    }}
                  >
                    <MarkdownRenderer
                      content={noteData.content}
                      setSelectedImage={setSelectedImage}
                      isGIC={
                        topic?.toLowerCase().includes('gic') ||
                        (noteData.subject === MedicalSubject.DENTAL_MATERIALS &&
                          (topic?.toLowerCase().includes('glass') ?? false))
                      }
                    />
                  </div>
                ) : (
                  <div className="min-h-[420px] flex flex-col items-center justify-center gap-3 text-slate-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-400" />
                    <p className="text-sm font-semibold">Preparing notes...</p>
                  </div>
                )}

                {/* Study mode freehand overlay */}
                <StudyModeOverlay
                  isActive={studyModeActive}
                  currentTool={studyTool}
                  highlightMode={highlightMode}
                  strokes={studyStrokes}
                  setStrokes={setStudyStrokes}
                  currentColor={studyColor}
                  isDarkMode={isDarkMode}
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Pearls */}
          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-200 dark:border-amber-500/20">
            <h3 className="font-bold text-amber-600 mb-4 text-lg">Quick Pearls</h3>
            <ul className="space-y-3 text-base">
              {noteData.keyPoints.map((point, idx) => (
                <li key={idx}>{'\u2022'} {point}</li>
              ))}
            </ul>
          </div>

          {/* Start Quiz button */}
          <button
            onClick={onStartQuiz}
            className="w-full p-6 bg-cyan-600 text-white font-bold rounded-3xl shadow-lg shadow-cyan-900/20 transition-transform active:scale-95 text-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* ---- Portal-rendered floating controls ---- */}
      {typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <>
            {/* Study Mode toggle button */}
            <button
              onClick={() => setStudyModeActive((prev) => !prev)}
              className={`fixed top-20 right-8 z-[260] p-3 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all active:scale-95 ${studyModeActive
                  ? 'bg-blue-600 text-white border-blue-500/40 shadow-blue-900/30'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-cyan-600 dark:hover:text-white'
                }`}
              title={studyModeActive ? 'Exit Study Mode' : 'Study Mode'}
              aria-pressed={studyModeActive}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* Font size control */}
            <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />

            {/* Study toolbar (when study mode is on) */}
            {studyModeActive && (
              <div className="fixed top-52 right-8 z-[255] pointer-events-auto">
                <StudyToolbar
                  currentTool={studyTool}
                  setTool={setStudyTool}
                  onUndo={handleUndo}
                  onClear={handleClear}
                  canUndo={canUndo}
                  currentColor={studyColor}
                  onColorChange={setStudyColor}
                  highlightMode={highlightMode}
                  onHighlightModeChange={setHighlightMode}
                />
              </div>
            )}

            {/* Persistent drawing toolbar (bottom bar) */}
            {drawingActive && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-full border shadow-2xl animate-in slide-in-from-bottom-10">
                <button
                  onClick={() => { setDrawingStrokes([]); localStorage.removeItem(storageKey); }}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mr-2"
                  title="Clear all study marks"
                >
                  Clear
                </button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button
                  onClick={() => setDrawingStrokes((prev) => prev.slice(0, -1))}
                  disabled={drawingStrokes.length === 0}
                  className={`p-2 font-bold ${drawingStrokes.length === 0 ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Undo
                </button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

                {/* Pen button */}
                <button
                  onClick={() => setDrawingTool('pen')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${drawingTool === 'pen' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <div className={`w-3 h-3 rounded-full bg-red-500 shadow-sm ${drawingTool === 'pen' ? 'ring-2 ring-white' : ''}`} />
                  <span className="font-bold text-sm">Pen</span>
                </button>

                {/* Highlighter button */}
                <button
                  onClick={() => setDrawingTool('highlighter')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${drawingTool === 'highlighter' ? 'bg-slate-100 dark:bg-white/10 ring-2 ring-blue-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <div
                    onClick={(e) => { e.stopPropagation(); setHighlightColor('yellow'); setDrawingTool('highlighter'); }}
                    className={`w-4 h-4 rounded-full bg-yellow-400 border border-yellow-600/20 ${highlightColor === 'yellow' ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    title="Yellow Highlight"
                  />
                  <div
                    onClick={(e) => { e.stopPropagation(); setHighlightColor('red'); setDrawingTool('highlighter'); }}
                    className={`w-4 h-4 rounded-full bg-red-500 border border-red-600/20 ${highlightColor === 'red' ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    title="Red Text Highlight"
                  />
                  <span className="font-bold text-sm ml-1">Highlighter</span>
                </button>

                {/* Eraser button */}
                <button
                  onClick={() => setDrawingTool('eraser')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${drawingTool === 'eraser' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <Eraser
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform ${drawingTool === 'eraser' ? 'scale-125' : 'scale-100'}`}
                  />
                  <span className="font-bold text-sm">Eraser</span>
                </button>

                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button
                  onClick={() => setDrawingActive(false)}
                  className="px-4 py-2 font-black text-blue-500 hover:text-blue-600"
                >
                  Close
                </button>
              </div>
            )}
          </>,
          document.body,
        )}

      {/* Image lightbox */}
      {selectedImage && (
        <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default SummaryView;

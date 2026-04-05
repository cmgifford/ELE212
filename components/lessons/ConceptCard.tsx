'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Lightbulb, ChevronDown } from 'lucide-react';

export interface Concept {
  title: string;
  plain: string;
  analogy: string;
  formula?: string;
}

export function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={clsx(
      'rounded-xl border transition-all',
      open ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white hover:border-slate-200'
    )}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-semibold text-slate-800">{concept.title}</span>
        <ChevronDown
          size={15}
          className={clsx('text-slate-400 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-amber-100 pt-3">
          {/* Plain English */}
          <p className="text-sm text-slate-700 leading-relaxed">{concept.plain}</p>

          {/* Real-world analogy */}
          <div className="flex gap-2.5 bg-white border border-amber-100 rounded-xl px-3 py-2.5">
            <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 italic leading-relaxed">{concept.analogy}</p>
          </div>

          {/* Formula */}
          {concept.formula && (
            <div className="bg-slate-900 rounded-xl px-4 py-2.5">
              <p className="text-sm font-mono text-emerald-400 tracking-wide">{concept.formula}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Clock, Zap, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepList } from '@/components/assignments/StepList';
import { FocusSprint } from '@/components/assignments/FocusSprint';
import { AIHelpPanel } from '@/components/assignments/AIHelpPanel';
import { getUrgencyLabel, formatDueDate } from '@/lib/ai/behaviors';
import type { Assignment, AssignmentStatus } from '@/lib/data/types';
import { clsx } from 'clsx';

interface Props {
  assignment: Assignment;
  onStatusChange: (s: AssignmentStatus) => void;
  onStepsChange: (steps: string[]) => void;
  onCompletedStepsChange: (completed: string[]) => void;
  onNotesChange: (notes: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  homework:     'bg-indigo-100 text-indigo-700',
  exercise:     'bg-blue-100 text-blue-700',
  extra_credit: 'bg-purple-100 text-purple-700',
};

export function AssignmentDetailClient({
  assignment,
  onStatusChange,
  onStepsChange,
  onCompletedStepsChange,
  onNotesChange,
}: Props) {
  const [generatingSteps, setGeneratingSteps] = useState(false);
  const [notes, setNotes] = useState(assignment.notes);

  const steps = assignment.steps;
  const completedSteps = assignment.completed_steps;
  const progress = steps.length > 0
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

  const urgency = getUrgencyLabel(assignment.due_date);
  const urgencyVariant = urgency.color as 'red' | 'orange' | 'amber' | 'yellow' | 'slate';

  async function generateSteps() {
    setGeneratingSteps(true);
    try {
      const res = await fetch(`/api/assignments/${assignment.id}/steps`, { method: 'POST' });
      const data = await res.json();
      if (data.steps) onStepsChange(data.steps);
    } finally {
      setGeneratingSteps(false);
    }
  }

  function toggleStep(index: number, completed: boolean) {
    const newCompleted = completed
      ? [...completedSteps, String(index)]
      : completedSteps.filter(s => s !== String(index));
    onCompletedStepsChange(newCompleted);
  }

  function markDone() {
    onStatusChange('completed');
  }

  return (
    <div>
      <Link href="/assignments" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={15} />
        All assignments
      </Link>

      <div className="mb-6">
        <div className="flex items-start gap-3 mb-2 flex-wrap">
          <span className={clsx('px-2.5 py-1 rounded-lg text-xs font-bold', TYPE_COLORS[assignment.type] ?? 'bg-slate-100 text-slate-600')}>
            {assignment.type === 'extra_credit' ? 'EXTRA CREDIT' : assignment.type.toUpperCase()} {assignment.number}
          </span>
          <Badge variant={urgencyVariant}>{urgency.label}</Badge>
          {assignment.status === 'completed' && <Badge variant="green">Done</Badge>}
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{assignment.title}</h1>
        {assignment.topic && <p className="text-base text-slate-500 mt-1">{assignment.topic}</p>}
        <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {formatDueDate(assignment.due_date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={14} />
            ~{assignment.estimated_minutes} min
          </span>
          <span>{'●'.repeat(assignment.difficulty)}{'○'.repeat(5 - assignment.difficulty)}</span>
        </div>
      </div>

      {steps.length > 0 && (
        <Card className="mb-6">
          <ProgressBar
            value={progress}
            color={progress === 100 ? 'emerald' : 'indigo'}
            size="md"
            showLabel
            label={`${completedSteps.length} of ${steps.length} steps done`}
          />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-3 flex-wrap">
            {assignment.url && (
              <a href={assignment.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" icon={<ExternalLink size={15} />}>Open Assignment</Button>
              </a>
            )}
            {assignment.late_url && assignment.status !== 'completed' && (
              <a href={assignment.late_url} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon={<ExternalLink size={15} />}>Late submission</Button>
              </a>
            )}
            {assignment.status !== 'completed' && (
              <Button variant="success" icon={<CheckCircle2 size={15} />} onClick={markDone}>
                Mark complete
              </Button>
            )}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-700">Steps</h2>
              {steps.length > 0 && <span className="text-xs text-slate-400">{completedSteps.length}/{steps.length}</span>}
            </div>
            <StepList
              assignmentId={assignment.id}
              steps={steps}
              completedSteps={completedSteps}
              onToggle={toggleStep}
              onGenerateSteps={generateSteps}
              loading={generatingSteps}
            />
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">Your notes</h2>
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={() => onNotesChange(notes)}
              placeholder="Write anything here — questions, ideas, things to remember..."
              className="w-full h-28 text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder:text-slate-300"
            />
          </Card>
        </div>

        <div className="space-y-5">
          <FocusSprint />
          <AIHelpPanel
            contextType="assignment"
            assignmentTitle={assignment.title}
            starterTopic={assignment.topic}
          />
        </div>
      </div>
    </div>
  );
}

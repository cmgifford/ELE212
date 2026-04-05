'use client';

import { Header } from '@/components/layout/Header';
import { AssignmentCard } from '@/components/dashboard/AssignmentCard';
import { useAssignments } from '@/hooks/useAssignments';
import type { Assignment, AssignmentType } from '@/lib/data/types';

const TYPE_ORDER: AssignmentType[] = ['homework', 'exercise', 'extra_credit'];

const TYPE_LABELS: Record<AssignmentType, string> = {
  homework:     'Homework',
  exercise:     'Exercises',
  quiz:         'Quizzes',
  extra_credit: 'Extra Credit',
};

export default function AssignmentsPage() {
  const { assignments } = useAssignments();

  const grouped = assignments.reduce<Record<string, Assignment[]>>((acc, a) => {
    if (!acc[a.type]) acc[a.type] = [];
    acc[a.type].push(a);
    return acc;
  }, {});

  const total = assignments.length;
  const done  = assignments.filter(a => a.status === 'completed').length;

  return (
    <div>
      <Header title="All Assignments" subtitle={`${done} of ${total} complete`} />

      {TYPE_ORDER.filter(t => grouped[t]?.length > 0).map(type => {
        const items = grouped[type];
        const typesDone = items.filter(a => a.status === 'completed').length;
        return (
          <section key={type} className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-800">{TYPE_LABELS[type]}</h2>
              <span className="text-xs text-slate-400">{typesDone}/{items.length} done</span>
            </div>
            <div className="space-y-2">
              {items.map(a => <AssignmentCard key={a.id} assignment={a} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

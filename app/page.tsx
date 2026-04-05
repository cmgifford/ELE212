'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { NextActionCard } from '@/components/dashboard/NextActionCard';
import { AssignmentCard } from '@/components/dashboard/AssignmentCard';
import { StatsSummary } from '@/components/dashboard/StatsSummary';
import { useAssignments } from '@/hooks/useAssignments';
import { getTopRecommendation } from '@/lib/ai/behaviors';
import { AlertCircle, Calendar, Clock, ChevronDown } from 'lucide-react';

export default function DashboardPage() {
  const { assignments } = useAssignments();
  const [showAllOverdue, setShowAllOverdue] = useState(false);
  const OVERDUE_PREVIEW = 3;

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const in7Days = new Date(today.getTime() + 7 * 86400000).toISOString();

  const overdue = assignments.filter(a => a.status === 'overdue');
  const todayItems = assignments.filter(a =>
    a.status !== 'completed' && a.due_date?.startsWith(todayStr)
  );
  const upcoming = assignments.filter(a =>
    a.status === 'upcoming' && a.due_date > todayStr && a.due_date <= in7Days
  );

  const total = assignments.filter(a => a.type === 'homework').length;
  const done  = assignments.filter(a => a.type === 'homework' && a.status === 'completed').length;

  const recommendation = getTopRecommendation([...overdue, ...todayItems, ...upcoming]);

  const dateLabel = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div>
      <Header title="Good to see you." subtitle={dateLabel} />

      <section className="mb-8">
        <NextActionCard assignment={recommendation} />
      </section>

      <section className="mb-8">
        <StatsSummary
          total={total}
          done={done}
          overdue={overdue.length}
          upcoming={upcoming.length}
          percent={total > 0 ? Math.round((done / total) * 100) : 0}
        />
      </section>

      {overdue.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={16} className="text-red-500" />
            <h2 className="text-sm font-semibold text-slate-700">Overdue</h2>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{overdue.length}</span>
          </div>
          <div className="space-y-2">
            {(showAllOverdue ? overdue : overdue.slice(-OVERDUE_PREVIEW)).map(a =>
              <AssignmentCard key={a.id} assignment={a} compact />
            )}
          </div>
          {overdue.length > OVERDUE_PREVIEW && (
            <button
              onClick={() => setShowAllOverdue(v => !v)}
              className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ChevronDown size={13} className={showAllOverdue ? 'rotate-180 transition-transform' : 'transition-transform'} />
              {showAllOverdue ? 'Show less' : `Show all ${overdue.length} overdue`}
            </button>
          )}
        </section>
      )}

      {todayItems.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-orange-500" />
            <h2 className="text-sm font-semibold text-slate-700">Due today</h2>
          </div>
          <div className="space-y-2">
            {todayItems.map(a => <AssignmentCard key={a.id} assignment={a} compact />)}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-slate-700">This week</h2>
          </div>
          <div className="space-y-2">
            {upcoming.slice(0, 6).map(a => <AssignmentCard key={a.id} assignment={a} compact />)}
          </div>
        </section>
      )}
    </div>
  );
}

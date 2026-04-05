'use client';

import { useState, useEffect } from 'react';
import rawAssignments from '@/lib/data/assignments.json';
import {
  getAssignmentState,
  setStatus,
  setSteps,
  setCompletedSteps,
  setNotes,
  computeStatus,
} from '@/lib/store';
import type { Assignment, AssignmentBase, AssignmentStatus } from '@/lib/data/types';

function hydrate(base: AssignmentBase): Assignment {
  const stored = getAssignmentState(base.id);
  // Use stored status if set, otherwise compute from due date
  const status = stored.status !== 'upcoming'
    ? stored.status
    : computeStatus(base.due_date);
  return { ...base, ...stored, status };
}

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(
    // Server-safe default — compute status from date only
    (rawAssignments as AssignmentBase[]).map(a => ({
      ...a,
      status: computeStatus(a.due_date),
      steps: [],
      completed_steps: [],
      notes: '',
    }))
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate with localStorage state on the client
    setAssignments((rawAssignments as AssignmentBase[]).map(hydrate));
    setHydrated(true);
  }, []);

  function updateStatus(id: string, status: AssignmentStatus) {
    setStatus(id, status);
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  function updateSteps(id: string, steps: string[]) {
    setSteps(id, steps);
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, steps } : a));
  }

  function updateCompletedSteps(id: string, completed: string[]) {
    setCompletedSteps(id, completed);
    const allSteps = assignments.find(a => a.id === id)?.steps ?? [];
    const newStatus: AssignmentStatus = completed.length === allSteps.length && allSteps.length > 0
      ? 'completed' : 'in_progress';
    setStatus(id, newStatus);
    setAssignments(prev => prev.map(a =>
      a.id === id ? { ...a, completed_steps: completed, status: newStatus } : a
    ));
  }

  function updateNotes(id: string, notes: string) {
    setNotes(id, notes);
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, notes } : a));
  }

  return { assignments, hydrated, updateStatus, updateSteps, updateCompletedSteps, updateNotes };
}

export function useAssignment(id: string) {
  const { assignments, hydrated, updateStatus, updateSteps, updateCompletedSteps, updateNotes } =
    useAssignments();
  const assignment = assignments.find(a => a.id === id) ?? null;
  return { assignment, hydrated, updateStatus, updateSteps, updateCompletedSteps, updateNotes };
}

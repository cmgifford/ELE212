// localStorage store for mutable assignment state.
// All keys are namespaced to avoid collisions.
// Safe to call on the server (returns defaults) — hydrates on client.

import type { AssignmentStatus, AssignmentState } from './data/types';

const NS = 'ele212';

function key(part: string, id: string) {
  return `${NS}:${part}:${id}`;
}

function read<T>(k: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(k);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(k: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(k, JSON.stringify(value));
  } catch {
    // storage full or private mode — silently fail
  }
}

// ── Per-assignment state ──────────────────────────────────────────────────────

export function getAssignmentState(id: string): AssignmentState {
  return {
    status:          read<AssignmentStatus>(key('status', id), 'upcoming'),
    steps:           read<string[]>(key('steps', id), []),
    completed_steps: read<string[]>(key('completedSteps', id), []),
    notes:           read<string>(key('notes', id), ''),
  };
}

export function setStatus(id: string, status: AssignmentStatus) {
  write(key('status', id), status);
}

export function setSteps(id: string, steps: string[]) {
  write(key('steps', id), steps);
}

export function setCompletedSteps(id: string, completed: string[]) {
  write(key('completedSteps', id), completed);
}

export function setNotes(id: string, notes: string) {
  write(key('notes', id), notes);
}

// ── Bulk reads for dashboard/list views ──────────────────────────────────────

export function getAllStatuses(): Record<string, AssignmentStatus> {
  if (typeof window === 'undefined') return {};
  const result: Record<string, AssignmentStatus> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(`${NS}:status:`)) {
      const id = k.slice(`${NS}:status:`.length);
      result[id] = read<AssignmentStatus>(k, 'upcoming');
    }
  }
  return result;
}

// Compute status purely from due date (used as the initial/default)
export function computeStatus(dueDate: string): AssignmentStatus {
  const due = new Date(dueDate);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  if (diffMs < 0) return 'overdue';
  if (diffMs < 24 * 60 * 60 * 1000) return 'in_progress';
  return 'upcoming';
}

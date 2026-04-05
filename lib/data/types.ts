export type AssignmentType = 'homework' | 'exercise' | 'extra_credit' | 'quiz';
export type AssignmentStatus = 'upcoming' | 'in_progress' | 'completed' | 'overdue';

// Static data shape — comes from JSON, never mutates
export interface AssignmentBase {
  id: string;
  type: AssignmentType;
  number: number;
  title: string;
  topic: string;
  due_date: string;
  points: number;
  url: string | null;
  late_url: string | null;
  lecture_ref: string | null;
  estimated_minutes: number;
  difficulty: number;
}

// Mutable state — lives in localStorage
export interface AssignmentState {
  status: AssignmentStatus;
  steps: string[];
  completed_steps: string[];
  notes: string;
}

// Combined view used throughout the app
export interface Assignment extends AssignmentBase, AssignmentState {}

export interface Lesson {
  id: string;
  lecture_number: number;
  date: string;
  title: string;
  topic: string;
  section: string;
  textbook_ref: string;
  slides_file: string | null;
  annotated_file: string | null;
}

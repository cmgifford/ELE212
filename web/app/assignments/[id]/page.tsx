'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useAssignment } from '@/hooks/useAssignments';
import { AssignmentDetailClient } from './AssignmentDetailClient';

export default function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { assignment, updateStatus, updateSteps, updateCompletedSteps, updateNotes } =
    useAssignment(id);

  if (!assignment) return notFound();

  return (
    <AssignmentDetailClient
      assignment={assignment}
      onStatusChange={status => updateStatus(id, status)}
      onStepsChange={steps => updateSteps(id, steps)}
      onCompletedStepsChange={completed => updateCompletedSteps(id, completed)}
      onNotesChange={notes => updateNotes(id, notes)}
    />
  );
}

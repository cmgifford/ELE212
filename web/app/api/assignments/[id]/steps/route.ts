import { NextResponse } from 'next/server';
import rawAssignments from '@/lib/data/assignments.json';
import { getAI, AI_MODEL, AI_MAX_TOKENS } from '@/lib/ai/client';
import { buildBreakdownPrompt } from '@/lib/ai/prompts';
import type { AssignmentBase } from '@/lib/data/types';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const assignment = (rawAssignments as AssignmentBase[]).find(a => a.id === id);
  if (!assignment) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ steps: buildDefaultSteps(assignment) });
  }

  try {
    const ai = getAI();
    const response = await ai.messages.create({
      model: AI_MODEL,
      max_tokens: AI_MAX_TOKENS,
      messages: [{ role: 'user', content: buildBreakdownPrompt(assignment) }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array in response');
    return NextResponse.json({ steps: JSON.parse(jsonMatch[0]) });
  } catch (err) {
    console.error('AI steps error:', err);
    return NextResponse.json({ steps: buildDefaultSteps(assignment) });
  }
}

function buildDefaultSteps(a: AssignmentBase): string[] {
  if (a.type === 'extra_credit') {
    return [
      `Open the ${a.title} extra credit page`,
      'Read all parts before starting',
      'Solve part 1',
      'Solve part 2',
      'Double-check both answers',
      'Submit for extra points',
    ];
  }
  return [
    `Open the ${a.title} assignment page`,
    'Read the problem statement carefully',
    'Identify all given values',
    'Draw or label the circuit diagram',
    'Choose the right analysis method',
    'Write your equations',
    'Solve step by step',
    'Check your units and answer',
    'Submit your work',
  ];
}

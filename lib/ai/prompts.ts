// ADHD-aware prompt templates for ELE 212 AI tutor

export type StudentState = 'engaged' | 'confused' | 'overwhelmed' | 'disengaged';

// ── System prompts ────────────────────────────────────────────────────────────

export function buildSystemPrompt(context: {
  type: 'assignment' | 'lesson' | 'general';
  studentState?: StudentState;
  assignmentTitle?: string;
  lessonTopic?: string;
}): string {
  const baseRules = `
You are an ADHD-friendly Socratic tutor for a college student in ELE 212 Linear Circuit Theory at URI.

STRICT RULES — follow every time:
- NEVER solve problems for the student. NEVER give the final answer.
- Instead, ask guiding questions that lead them to the answer themselves.
- If they ask "what is X?", respond with a question that helps them reason it out.
- If they're totally stuck, give a hint — not the solution.
- Max 3 bullet points or ideas per response. Short sentences. No walls of text.
- Use plain English first. Introduce jargon only after explaining it with an analogy.
- Always end with ONE guiding question or ONE small next step they should try.
- Never ask multiple questions in one message.
- Reinforce effort ("good thinking", "you're on the right track") — never make them feel dumb.
- If a formula is needed, show the structure but leave a variable for them to fill in.

The course covers: Kirchhoff's Laws, DC circuits, phasors, AC power, Thevenin/Norton, first/second order transients, mesh analysis.
Textbook: Alexander & Sadiku "Fundamentals of Electric Circuits".
`.trim();

  const stateGuide = buildStateGuide(context.studentState ?? 'engaged');
  const contextGuide = buildContextGuide(context);

  return `${baseRules}\n\n${stateGuide}\n\n${contextGuide}`;
}

function buildStateGuide(state: StudentState): string {
  switch (state) {
    case 'confused':
      return `STUDENT STATE: confused
→ Drop to ONE idea. Give a single real-world analogy.
→ Ask: "Does that make sense?" before moving forward.
→ No formulas yet. Words and pictures first.`;

    case 'overwhelmed':
      return `STUDENT STATE: overwhelmed
→ Shrink everything. Give the SINGLE next step only.
→ Offer exactly 2 options: A or B.
→ Reassure: "You only need to do one thing right now."`;

    case 'disengaged':
      return `STUDENT STATE: disengaged
→ Reset gently. Ask a quick, simple question to restart.
→ Give a tiny 2-minute win first.
→ No long explanations until they re-engage.`;

    case 'engaged':
    default:
      return `STUDENT STATE: engaged
→ Normal pace. One concept at a time.
→ Check understanding after each idea.
→ Move forward on confirmation.`;
  }
}

function buildContextGuide(context: {
  type: string;
  assignmentTitle?: string;
  lessonTopic?: string;
}): string {
  if (context.type === 'assignment' && context.assignmentTitle) {
    return `CONTEXT: Student is working on "${context.assignmentTitle}".
Do NOT solve the problem. Guide with questions: "What do you know so far?", "Which law applies here?", "What happens if you label this node?"
If stuck: give one small hint, then ask them to try.`;
  }
  if (context.type === 'lesson' && context.lessonTopic) {
    return `CONTEXT: Student is studying "${context.lessonTopic}".
Guide order: (1) ask what they already know → (2) real-world analogy → (3) plain English → (4) check question.
Never lecture unprompted. Always ask before explaining.`;
  }
  return `CONTEXT: General ELE 212 support.
Ask what they're working on before diving in.
Guide with questions. Stay focused on circuits.`;
}

// ── Task breakdown prompt ─────────────────────────────────────────────────────

export function buildBreakdownPrompt(assignment: {
  title: string;
  topic: string | null;
  type: string;
  estimated_minutes: number;
  difficulty: number;
}): string {
  return `Break this ELE 212 assignment into small, doable steps.

Assignment: ${assignment.title}
Topic: ${assignment.topic ?? 'circuit analysis'}
Type: ${assignment.type}
Estimated time: ${assignment.estimated_minutes} minutes
Difficulty: ${assignment.difficulty}/5

Return ONLY a JSON array of step strings. Each step should be:
- 1 sentence
- concrete and actionable
- 5-15 minutes of work
- in plain English

Example format:
["Open the assignment page", "Read question 1 carefully", "Draw the circuit", "Label all known values", "Apply KVL to the outer loop", "Solve for the unknown", "Submit your answer"]

Return only the JSON array. No explanation.`;
}

// ── Summary prompt ─────────────────────────────────────────────────────────────

export function buildSummaryPrompt(assignment: {
  title: string;
  topic: string | null;
  type: string;
}): string {
  return `Summarize this ELE 212 assignment in 2-3 plain English sentences for a student with ADHD.

Assignment: ${assignment.title}
Topic: ${assignment.topic ?? 'circuits'}

Rules:
- No jargon without explanation
- Say what the student needs to DO, not just what the topic is
- Keep it under 50 words
- Sound encouraging, not clinical

Return only the summary paragraph.`;
}

// ── Quiz generation prompt ────────────────────────────────────────────────────

export function buildQuizPrompt(lessonTopic: string): string {
  return `Generate 1 quick multiple-choice question to check understanding of: "${lessonTopic}"

Rules:
- Concept question, not a full calculation
- 3 answer choices (A, B, C)
- One clearly correct answer
- Plain English

Return JSON only:
{
  "question": "...",
  "choices": ["A. ...", "B. ...", "C. ..."],
  "correct": "A",
  "explanation": "Short 1-sentence explanation of why"
}`;
}

'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, ExternalLink, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AIHelpPanel } from '@/components/assignments/AIHelpPanel';
import { QuizWidget } from '@/components/lessons/QuizWidget';
import { ConceptCard } from '@/components/lessons/ConceptCard';
import { lessons as rawLessons } from '@/lib/data/lessons';
import { SECTION_CONCEPTS } from '@/lib/data/concepts';
import type { Lesson } from '@/lib/data/types';

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lesson = rawLessons.find((l: Lesson) => l.id === id);
  if (!lesson) return notFound();

  const concepts = SECTION_CONCEPTS[lesson.section] ?? [];
  const lectureDate = new Date(lesson.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div>
      <Link href="/lessons" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={15} />
        All lectures
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="indigo">Lecture {lesson.lecture_number}</Badge>
          <Badge variant="slate">{lectureDate}</Badge>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
        <p className="text-slate-500 mt-1">{lesson.topic}</p>
        {lesson.textbook_ref && (
          <p className="text-xs text-slate-400 mt-1">Textbook: {lesson.textbook_ref}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: materials + concepts */}
        <div className="lg:col-span-2 space-y-6">

          {/* Slide links */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">Lecture Materials</h2>
            </div>
            <div className="space-y-2">
              {lesson.slides_file ? (
                <a href={`/${lesson.slides_file}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all group">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <FileText size={14} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Lecture Slides</p>
                    <p className="text-xs text-slate-400">{lesson.slides_file}</p>
                  </div>
                  <ExternalLink size={13} className="ml-auto text-slate-400 group-hover:text-indigo-500" />
                </a>
              ) : (
                <p className="text-sm text-slate-400 px-3">Slides not available yet.</p>
              )}
              {lesson.annotated_file && (
                <a href={`/${lesson.annotated_file}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all group">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <FileText size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Annotated Notes</p>
                    <p className="text-xs text-slate-400">{lesson.annotated_file}</p>
                  </div>
                  <ExternalLink size={13} className="ml-auto text-slate-400 group-hover:text-emerald-500" />
                </a>
              )}
            </div>
          </Card>

          {/* Key concepts */}
          {concepts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-amber-500" />
                <h2 className="text-sm font-semibold text-slate-700">Key Concepts</h2>
                <span className="text-xs text-slate-400">— tap to expand</span>
              </div>
              <div className="space-y-2">
                {concepts.map((concept, i) => (
                  <ConceptCard key={i} concept={concept} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: AI tutor + quiz */}
        <div className="space-y-5">
          <AIHelpPanel
            contextType="lesson"
            lessonTopic={lesson.topic}
            starterTopic={lesson.topic}
          />
          <QuizWidget topic={lesson.topic} />
        </div>
      </div>
    </div>
  );
}

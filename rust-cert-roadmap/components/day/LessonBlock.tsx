'use client';

import { useAppStore } from '@/lib/progress-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Video,
  BookOpen,
  Code2,
  Dumbbell,
  HelpCircle,
  FolderKanban,
  ExternalLink,
  Clock,
} from 'lucide-react';
import type { Lesson } from '@/types';

const typeIcons: Record<Lesson['type'], React.ElementType> = {
  video: Video,
  reading: BookOpen,
  coding: Code2,
  exercise: Dumbbell,
  quiz: HelpCircle,
  project: FolderKanban,
};

const platformColors: Record<string, string> = {
  udemy: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  rustbook: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  ardan: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  docs: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  github: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  custom: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export default function LessonBlock({ lesson, dayId }: { lesson: Lesson; dayId: number }) {
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const toggleLesson = useAppStore((s) => s.toggleLesson);
  const lessonKey = `${dayId}-${lesson.id}`;
  const isCompleted = lessonProgress[lessonKey] || false;
  const Icon = typeIcons[lesson.type];

  return (
    <Card
      className={`transition-all ${isCompleted ? 'opacity-60 border-emerald-500/30' : ''}`}
      data-testid={`lesson-${lesson.id}`}
    >
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => toggleLesson(lessonKey)}
            className="mt-1"
            data-testid={`lesson-check-${lesson.id}`}
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <h3 className={`text-sm font-medium ${isCompleted ? 'line-through' : ''}`}>
                  {lesson.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}m
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{lesson.description}</p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs ${platformColors[lesson.resource.platform] || ''}`}>
                {lesson.resource.platform}
              </Badge>
              <a
                href={lesson.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#DEA584] hover:underline flex items-center gap-1"
              >
                {lesson.resource.title}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {lesson.objectives.length > 0 && (
              <ul className="text-xs text-muted-foreground space-y-0.5 ml-4 list-disc">
                {lesson.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            )}

            {lesson.codeExercise && (
              <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs font-medium mb-1">Code Exercise:</p>
                <p className="text-xs text-muted-foreground mb-2">{lesson.codeExercise.prompt}</p>
                <pre className="text-xs bg-black/50 p-2 rounded overflow-x-auto font-mono">
                  <code>{lesson.codeExercise.starterCode}</code>
                </pre>
                {lesson.codeExercise.hint && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    Hint: {lesson.codeExercise.hint}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

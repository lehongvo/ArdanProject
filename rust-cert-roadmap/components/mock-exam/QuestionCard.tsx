'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import type { ExamQuestion } from '@/types';

interface QuestionCardProps {
  question: ExamQuestion;
  index: number;
  total: number;
  selectedAnswer: string | null;
  isFlagged: boolean;
  onAnswer: (answer: string) => void;
  onFlag: () => void;
}

const difficultyColors = {
  easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  isFlagged,
  onAnswer,
  onFlag,
}: QuestionCardProps) {
  return (
    <Card data-testid={`question-${question.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {index + 1} of {total}
            </span>
            <Badge variant="outline" className={difficultyColors[question.difficulty]}>
              {question.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.topic}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFlag}
            className={isFlagged ? 'text-amber-500' : 'text-muted-foreground'}
            data-testid="flag-question"
          >
            <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-500' : ''}`} />
          </Button>
        </div>
        <CardTitle className="text-base mt-2 whitespace-pre-wrap">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {(['A', 'B', 'C', 'D'] as const).map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            data-testid={`option-${option}`}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
              selectedAnswer === option
                ? 'border-[#DEA584] bg-[#DEA584]/10 text-foreground'
                : 'border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="font-medium mr-2">{option}.</span>
            {question.options[option]}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

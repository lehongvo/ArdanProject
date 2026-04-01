'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock, Trophy, RotateCcw } from 'lucide-react';
import type { ExamQuestion } from '@/types';

interface ResultSummaryProps {
  questions: ExamQuestion[];
  answers: Record<string, string>;
  timeUsed: number;
  onRetry: () => void;
}

export default function ResultSummary({ questions, answers, timeUsed, onRetry }: ResultSummaryProps) {
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);
  const passed = percent >= 80;

  const topicBreakdown = questions.reduce<Record<string, { correct: number; total: number }>>(
    (acc, q) => {
      if (!acc[q.topic]) acc[q.topic] = { correct: 0, total: 0 };
      acc[q.topic].total++;
      if (answers[q.id] === q.answer) acc[q.topic].correct++;
      return acc;
    },
    {}
  );

  const wrongQuestions = questions.filter((q) => answers[q.id] !== q.answer);
  const minutes = Math.floor(timeUsed / 60);
  const seconds = timeUsed % 60;

  return (
    <div className="space-y-6" data-testid="exam-results">
      <Card className={passed ? 'border-emerald-500/30' : 'border-red-500/30'}>
        <CardContent className="pt-6 text-center space-y-4">
          <Trophy className={`w-16 h-16 mx-auto ${passed ? 'text-emerald-500' : 'text-red-500'}`} />
          <div>
            <h2 className="text-3xl font-bold">{percent}%</h2>
            <p className="text-muted-foreground">
              {correct}/{total} correct
            </p>
          </div>
          <Badge className={passed ? 'bg-emerald-600' : 'bg-red-600'} variant="default">
            {passed ? 'PASSED' : 'FAILED'} (80% required)
          </Badge>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Time: {minutes}m {seconds}s
          </div>
          <Button onClick={onRetry} variant="outline" className="mt-4">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Exam
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topic Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(topicBreakdown).map(([topic, data]) => {
            const topicPercent = Math.round((data.correct / data.total) * 100);
            return (
              <div key={topic} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-sm">{topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {data.correct}/{data.total}
                  </span>
                  <Badge variant={topicPercent >= 80 ? 'default' : 'secondary'} className="text-xs">
                    {topicPercent}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {wrongQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Review Wrong Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {wrongQuestions.map((q) => (
              <div key={q.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
                <p className="text-sm font-medium whitespace-pre-wrap">{q.question}</p>
                <div className="flex items-center gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-400">
                    Your answer: {answers[q.id] || 'Unanswered'} — {answers[q.id] ? q.options[answers[q.id] as keyof typeof q.options] : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-400">
                    Correct: {q.answer} — {q.options[q.answer]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{q.explanation}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

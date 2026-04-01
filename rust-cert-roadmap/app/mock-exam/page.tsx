'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/progress-store';
import { examQuestions, getRandomQuestions, examTopics } from '@/lib/exam-questions';
import Timer from '@/components/mock-exam/Timer';
import QuestionCard from '@/components/mock-exam/QuestionCard';
import ResultSummary from '@/components/mock-exam/ResultSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import type { ExamQuestion } from '@/types';

type ExamMode = 'setup' | 'exam' | 'result';
type ExamType = 'full' | 'quick' | 'topic';

export default function MockExamPage() {
  const [mode, setMode] = useState<ExamMode>('setup');
  const [examType, setExamType] = useState<ExamType>('quick');
  const [selectedTopic, setSelectedTopic] = useState(examTopics[0] || '');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [startTime, setStartTime] = useState(0);
  const [timeUsed, setTimeUsed] = useState(0);

  const addMockExamResult = useAppStore((s) => s.addMockExamResult);

  const getExamConfig = (type: ExamType) => {
    switch (type) {
      case 'full':
        return { count: Math.min(100, examQuestions.length), time: 90 * 60 };
      case 'quick':
        return { count: Math.min(25, examQuestions.length), time: 25 * 60 };
      case 'topic': {
        const topicQs = examQuestions.filter((q) => q.topic === selectedTopic);
        return { count: topicQs.length, time: topicQs.length * 60 };
      }
    }
  };

  const startExam = () => {
    let qs: ExamQuestion[];
    if (examType === 'topic') {
      qs = examQuestions
        .filter((q) => q.topic === selectedTopic)
        .sort(() => Math.random() - 0.5);
    } else {
      const config = getExamConfig(examType);
      qs = getRandomQuestions(config.count);
    }
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged(new Set());
    setStartTime(Date.now());
    setMode('exam');
  };

  const finishExam = useCallback(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    setTimeUsed(elapsed);

    const correct = questions.filter((q) => answers[q.id] === q.answer).length;
    const wrongTopics = [
      ...new Set(
        questions.filter((q) => answers[q.id] !== q.answer).map((q) => q.topic)
      ),
    ];

    addMockExamResult({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      score: correct,
      totalQuestions: questions.length,
      timeUsed: elapsed,
      wrongTopics,
      passed: correct / questions.length >= 0.8,
    });

    setMode('result');
  }, [startTime, questions, answers, addMockExamResult]);

  if (mode === 'result') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Exam Results</h1>
        <ResultSummary
          questions={questions}
          answers={answers}
          timeUsed={timeUsed}
          onRetry={() => setMode('setup')}
        />
      </div>
    );
  }

  if (mode === 'exam') {
    const config = getExamConfig(examType);
    const currentQuestion = questions[currentIndex];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Mock Exam</h1>
          <div className="flex items-center gap-3">
            <Timer
              totalSeconds={config.time}
              onTimeUp={finishExam}
              isRunning={true}
            />
            <Button variant="destructive" size="sm" onClick={finishExam} data-testid="submit-exam">
              <Send className="w-4 h-4 mr-1" />
              Submit
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                i === currentIndex
                  ? 'bg-[#DEA584] text-black'
                  : flagged.has(q.id)
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : answers[q.id]
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-muted text-muted-foreground'
              }`}
              data-testid={`nav-q-${i}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={questions.length}
            selectedAnswer={answers[currentQuestion.id] || null}
            isFlagged={flagged.has(currentQuestion.id)}
            onAnswer={(answer) =>
              setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
            }
            onFlag={() =>
              setFlagged((prev) => {
                const next = new Set(prev);
                if (next.has(currentQuestion.id)) {
                  next.delete(currentQuestion.id);
                } else {
                  next.add(currentQuestion.id);
                }
                return next;
              })
            }
          />
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {Object.keys(answers).length}/{questions.length} answered
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={currentIndex === questions.length - 1}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Setup mode
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mock Exam</h1>
        <p className="text-muted-foreground mt-1">
          Practice for the Ardan Labs Rust Certification (100 questions, 90 minutes, 80% to pass)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { type: 'full' as const, label: 'Full Exam', desc: '100 questions, 90 min', badge: 'Recommended' },
          { type: 'quick' as const, label: 'Quick Practice', desc: '25 questions, 25 min', badge: 'Popular' },
          { type: 'topic' as const, label: 'Topic Focus', desc: 'By category', badge: 'Targeted' },
        ].map((opt) => (
          <Card
            key={opt.type}
            className={`cursor-pointer transition-all ${
              examType === opt.type ? 'border-[#DEA584]' : 'hover:border-muted-foreground/30'
            }`}
            onClick={() => setExamType(opt.type)}
            data-testid={`exam-type-${opt.type}`}
          >
            <CardContent className="pt-4 text-center space-y-2">
              <Badge variant="outline" className="text-xs">{opt.badge}</Badge>
              <h3 className="font-semibold text-sm">{opt.label}</h3>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {examType === 'topic' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Select Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {examTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopic === topic ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={startExam}
        className="w-full bg-[#DEA584] hover:bg-[#c8916f] text-black font-semibold"
        data-testid="start-exam"
      >
        Start Exam
      </Button>
    </div>
  );
}

'use client';

import { useState, useCallback, useRef } from 'react';
import { Brain, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Timer } from '@/components/mock-exam/Timer';
import { QuestionCard } from '@/components/mock-exam/QuestionCard';
import { ResultSummary } from '@/components/mock-exam/ResultSummary';
import { useProgressStore } from '@/lib/progress-store';
import { getRandomQuestions, getMixedRandomQuestions } from '@/lib/exam-questions';
import type { ExamQuestion, MockExamResult } from '@/types';

type ExamMode = 'setup' | 'running' | 'finished' | 'review';
type ExamConfig = { type: ExamQuestion['examType'] | 'mixed'; count: number; timeSeconds: number; label: string };

const CONFIGS: ExamConfig[] = [
  { type: 'ardan-rust', count: 20, timeSeconds: 90 * 60, label: 'Ardan Rust Full (20 câu · 90 phút)' },
  { type: 'rust-foundation', count: 15, timeSeconds: 20 * 60, label: 'Rust Foundation (15 câu · 20 phút)' },
  { type: 'zk-cert', count: 10, timeSeconds: 15 * 60, label: 'ZK Certificate (10 câu · 15 phút)' },
  { type: 'mixed', count: 20, timeSeconds: 30 * 60, label: 'Mixed Quick (20 câu · 30 phút)' },
];

export default function MockExamPage() {
  const { addMockResult, mockExamResults } = useProgressStore();
  const [mode, setMode] = useState<ExamMode>('setup');
  const [config, setConfig] = useState<ExamConfig>(CONFIGS[0]);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const startTimeRef = useRef<number>(0);

  const startExam = () => {
    const qs =
      config.type === 'mixed'
        ? getMixedRandomQuestions(config.count)
        : getRandomQuestions(config.type, config.count);
    if (qs.length === 0) return;

    setQuestions(qs);
    setAnswers(Object.fromEntries(qs.map((q) => [q.id, null])));
    setFlagged(new Set());
    setCurrent(0);
    startTimeRef.current = Date.now();
    setMode('running');
    setReviewMode(false);
    setResult(null);
  };

  const finishExam = useCallback(() => {
    const timeUsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const score = questions.filter((q) => answers[q.id] === q.answer).length;
    const passed = score / questions.length >= 0.8;
    const wrongTopics = [
      ...new Set(questions.filter((q) => answers[q.id] !== q.answer).map((q) => q.topic)),
    ];

    const r: MockExamResult = {
      id: crypto.randomUUID(),
      examType: config.type === 'mixed' ? 'custom' : config.type,
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      timeUsed,
      wrongTopics,
      passed,
    };
    setResult(r);
    addMockResult(r);
    setMode('finished');
  }, [questions, answers, config.type, addMockResult]);

  const answer = (ans: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [questions[current].id]: ans }));
  };

  const toggleFlag = () => {
    const id = questions[current].id;
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const nav = (dir: number) => {
    setCurrent((c) => Math.max(0, Math.min(questions.length - 1, c + dir)));
  };

  // ─── Setup Screen ─────────────────────────────────────────────────────────
  if (mode === 'setup') {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-black text-white">Mock Exam 🧠</h1>
          <p className="text-sm text-[#888]">Luyện thi — Rust · Ardan · ZK Certificate</p>
        </div>

        {/* Recent results */}
        {mockExamResults.length > 0 && (
          <div className="card p-4">
            <h3 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">Kết Quả Gần Đây</h3>
            <div className="space-y-2">
              {mockExamResults.slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <span className="text-[#888] text-xs">{new Date(r.date).toLocaleDateString('vi-VN')}</span>
                  <span className="text-xs text-[#888]">{r.examType}</span>
                  <span className={`font-bold ${r.passed ? 'text-green-400' : 'text-red-400'}`}>
                    {Math.round((r.score / r.totalQuestions) * 100)}%
                    {r.passed ? ' PASS' : ' FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Config selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#888]">Chọn loại bài thi:</p>
          {CONFIGS.map((c) => (
            <button
              key={c.label}
              onClick={() => setConfig(c)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                config.label === c.label
                  ? 'border-[#8B5CF6]/60 bg-[#8B5CF6]/10'
                  : 'border-[#222] bg-[#111] hover:border-[#333]'
              }`}
            >
              <p className={`text-sm font-medium ${config.label === c.label ? 'text-[#8B5CF6]' : 'text-white'}`}>
                {c.label}
              </p>
              <p className="text-xs text-[#888] mt-0.5">
                {c.count} câu · {Math.floor(c.timeSeconds / 60)} phút · Cần 80% để pass
              </p>
            </button>
          ))}
        </div>

        <button
          onClick={startExam}
          data-testid="start-exam"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#8B5CF6] text-white font-bold text-sm hover:bg-[#7c3aed] transition-colors"
        >
          <Play size={16} />
          Bắt Đầu Thi
        </button>
      </div>
    );
  }

  // ─── Finished Screen ──────────────────────────────────────────────────────
  if (mode === 'finished' && result) {
    if (reviewMode) {
      return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setReviewMode(false)} className="text-[#888] hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-bold text-white">Xem Lại Đáp Án</h2>
          </div>
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              total={questions.length}
              selected={answers[q.id]}
              flagged={flagged.has(q.id)}
              onSelect={() => undefined}
              onFlag={() => undefined}
              showAnswer
            />
          ))}
        </div>
      );
    }

    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <Brain size={20} className="text-[#8B5CF6]" />
          <h1 className="text-xl font-black text-white">Kết Quả</h1>
        </div>
        <ResultSummary
          result={result}
          questions={questions}
          answers={answers}
          onReview={() => setReviewMode(true)}
          onRestart={() => setMode('setup')}
        />
      </div>
    );
  }

  // ─── Running Screen ───────────────────────────────────────────────────────
  const currentQ = questions[current];
  const answeredCount = Object.values(answers).filter(Boolean).length;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      {/* Exam header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Brain size={18} className="text-[#8B5CF6]" />
          <span className="text-sm text-[#888]">
            Đã trả lời: {answeredCount}/{questions.length}
          </span>
        </div>
        <Timer
          totalSeconds={config.timeSeconds}
          onExpire={finishExam}
          isRunning={mode === 'running'}
        />
      </div>

      {/* Question nav grid */}
      <div className="card p-3">
        <div className="flex flex-wrap gap-1">
          {questions.map((q, i) => {
            const ans = answers[q.id];
            const isFlag = flagged.has(q.id);
            return (
              <button
                key={q.id}
                onClick={() => setCurrent(i)}
                data-testid={`nav-q-${i}`}
                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                  i === current
                    ? 'ring-2 ring-white'
                    : ''
                } ${
                  isFlag
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : ans
                    ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]'
                    : 'bg-[#1a1a1a] text-[#666]'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="flex gap-4 mt-2 text-[10px] text-[#888]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#8B5CF6]/20 inline-block" /> Đã trả lời
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-yellow-400/20 inline-block" /> Đánh dấu
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#1a1a1a] inline-block" /> Chưa
          </span>
        </div>
      </div>

      {/* Question */}
      {currentQ && (
        <QuestionCard
          question={currentQ}
          index={current}
          total={questions.length}
          selected={answers[currentQ.id]}
          flagged={flagged.has(currentQ.id)}
          onSelect={answer}
          onFlag={toggleFlag}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => nav(-1)}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222] text-sm text-[#888] hover:text-white hover:border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} /> Trước
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={finishExam}
            data-testid="submit-exam"
            className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors"
          >
            Nộp Bài ({answeredCount}/{questions.length})
          </button>
        ) : (
          <button
            onClick={() => nav(1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#222] text-sm text-[#888] hover:text-white hover:border-[#333] transition-colors"
          >
            Tiếp <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

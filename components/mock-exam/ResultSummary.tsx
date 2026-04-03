'use client';

import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import type { ExamQuestion, MockExamResult } from '@/types';

interface ResultSummaryProps {
  result: MockExamResult;
  questions: ExamQuestion[];
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  onReview: () => void;
  onRestart: () => void;
}

export function ResultSummary({ result, questions, answers, onReview, onRestart }: ResultSummaryProps) {
  const pct = Math.round((result.score / result.totalQuestions) * 100);
  const mins = Math.floor(result.timeUsed / 60);
  const secs = result.timeUsed % 60;

  // topic breakdown
  const topicMap: Record<string, { total: number; wrong: number }> = {};
  questions.forEach((q) => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, wrong: 0 };
    topicMap[q.topic].total++;
    if (answers[q.id] !== q.answer) topicMap[q.topic].wrong++;
  });
  const topicBreakdown = Object.entries(topicMap).sort((a, b) => b[1].wrong - a[1].wrong);

  const wrongQuestions = questions.filter((q) => answers[q.id] !== q.answer);

  return (
    <div className="space-y-5">
      {/* Score hero */}
      <div className={`card p-8 text-center border-2 ${result.passed ? 'border-green-500/40' : 'border-red-500/40'}`}>
        <div className="flex justify-center mb-4">
          {result.passed ? (
            <Trophy size={48} className="text-yellow-400" />
          ) : (
            <XCircle size={48} className="text-red-400" />
          )}
        </div>
        <p className={`text-6xl font-black mb-2 ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
          {pct}%
        </p>
        <p className="text-xl font-bold text-white mb-1">
          {result.score}/{result.totalQuestions} câu đúng
        </p>
        <p className={`text-sm font-medium ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
          {result.passed ? 'PASS — Xuất sắc! 🎉' : 'FAIL — Cần ôn thêm'}
        </p>
        <p className="text-xs text-[#888] mt-2">
          Thời gian: {mins}:{String(secs).padStart(2, '0')} · Cần {result.passed ? 80 : 80}% để pass
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <CheckCircle2 size={18} className="text-green-400 mx-auto mb-1" />
          <p className="text-xl font-black text-green-400">{result.score}</p>
          <p className="text-xs text-[#888]">Đúng</p>
        </div>
        <div className="card p-4 text-center">
          <XCircle size={18} className="text-red-400 mx-auto mb-1" />
          <p className="text-xl font-black text-red-400">{result.totalQuestions - result.score}</p>
          <p className="text-xs text-[#888]">Sai</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xl font-black text-white">{mins}:{String(secs).padStart(2, '0')}</p>
          <p className="text-xs text-[#888]">Thời gian</p>
        </div>
      </div>

      {/* Topic breakdown */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Phân Tích Theo Chủ Đề</h3>
        <div className="space-y-3">
          {topicBreakdown.map(([topic, stats]) => {
            const topicPct = Math.round(((stats.total - stats.wrong) / stats.total) * 100);
            return (
              <div key={topic}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#ccc]">{topic}</span>
                  <span className={topicPct >= 80 ? 'text-green-400' : topicPct >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                    {stats.total - stats.wrong}/{stats.total} ({topicPct}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#222]">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${topicPct}%`,
                      background: topicPct >= 80 ? '#22c55e' : topicPct >= 60 ? '#eab308' : '#ef4444',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wrong questions */}
      {wrongQuestions.length > 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">
            Câu Sai ({wrongQuestions.length})
          </h3>
          <div className="space-y-3">
            {wrongQuestions.slice(0, 5).map((q) => (
              <div key={q.id} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-xs text-white mb-1 line-clamp-2">{q.question}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-400">Bạn: {answers[q.id] ?? '—'}</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-green-400">Đúng: {q.answer}</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-[#888]">{q.topic}</span>
                </div>
              </div>
            ))}
            {wrongQuestions.length > 5 && (
              <p className="text-xs text-[#888] text-center">+{wrongQuestions.length - 5} câu nữa — xem chi tiết bên dưới</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onReview}
          className="flex-1 py-3 rounded-xl border border-[#8B5CF6]/40 text-[#8B5CF6] font-semibold text-sm hover:bg-[#8B5CF6]/10 transition-colors"
        >
          Xem Lại Đáp Án
        </button>
        <button
          onClick={onRestart}
          data-testid="restart-exam"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F97316] text-white font-semibold text-sm hover:bg-[#ea6c0a] transition-colors"
        >
          <RotateCcw size={14} />
          Thi Lại
        </button>
      </div>
    </div>
  );
}

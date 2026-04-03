'use client';

import { Flag } from 'lucide-react';
import type { ExamQuestion } from '@/types';

interface QuestionCardProps {
  question: ExamQuestion;
  index: number;
  total: number;
  selected: 'A' | 'B' | 'C' | 'D' | null;
  flagged: boolean;
  onSelect: (answer: 'A' | 'B' | 'C' | 'D') => void;
  onFlag: () => void;
  showAnswer?: boolean;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const;

export function QuestionCard({
  question,
  index,
  total,
  selected,
  flagged,
  onSelect,
  onFlag,
  showAnswer = false,
}: QuestionCardProps) {
  const getOptionStyle = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!showAnswer) {
      if (selected === key) {
        return 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-white';
      }
      return 'border-[#222] bg-[#111] text-[#ccc] hover:border-[#444] hover:text-white';
    }
    // Review mode
    if (key === question.answer) return 'border-green-500 bg-green-500/10 text-green-300';
    if (key === selected && key !== question.answer) return 'border-red-500 bg-red-500/10 text-red-300';
    return 'border-[#222] bg-[#111] text-[#555]';
  };

  const diffColor = {
    easy: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    hard: 'text-red-400 bg-red-400/10',
  }[question.difficulty];

  return (
    <div className="card p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">
            Câu {index + 1}
            <span className="text-[#888] font-normal">/{total}</span>
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${diffColor}`}>
            {question.difficulty}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#888]">
            {question.topic}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#666]">
            {question.examType}
          </span>
        </div>
        <button
          onClick={onFlag}
          className={`p-2 rounded-lg transition-colors ${flagged ? 'text-yellow-400 bg-yellow-400/10' : 'text-[#555] hover:text-yellow-400'}`}
          title="Đánh dấu để xem lại"
        >
          <Flag size={14} fill={flagged ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Question */}
      <p className="text-white font-medium leading-relaxed mb-5 whitespace-pre-line">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {OPTION_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => !showAnswer && onSelect(key)}
            disabled={showAnswer}
            data-testid={`option-${key}`}
            className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${getOptionStyle(key)}`}
          >
            <span className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border border-current opacity-60">
              {key}
            </span>
            <span className="text-sm leading-snug">{question.options[key]}</span>
          </button>
        ))}
      </div>

      {/* Explanation (review mode) */}
      {showAnswer && (
        <div className="mt-5 p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
          <p className="text-xs font-semibold text-[#8B5CF6] mb-1">Giải thích</p>
          <p className="text-sm text-[#ccc] leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

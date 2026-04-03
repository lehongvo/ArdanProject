'use client';

import { useProgressStore } from '@/lib/progress-store';
import { PHASES } from '@/lib/roadmap-data';

function getDaysSinceStart(startDate: string): number {
  if (!startDate) return 1;
  const ms = Date.now() - new Date(startDate).getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

const PHASE_QUOTES: Record<number, string> = {
  1:  'Mỗi chuyên gia đều từng là người mới bắt đầu. Hãy viết dòng Rust đầu tiên của bạn hôm nay.',
  2:  'Ownership và lifetimes nghe khó — nhưng khi hiểu rồi, bạn sẽ thấy chúng thật đẹp.',
  3:  'Chứng chỉ Ardan Labs đang chờ bạn. Mỗi câu hỏi mock exam là một bước tiến.',
  4:  '1000 bài LeetCode không phải là gánh nặng — đó là 1000 bài học về tư duy.',
  5:  'Solana là tương lai của blockchain. Bạn đang xây dựng kỹ năng của tương lai.',
  6:  'Anchor framework giúp bạn viết smart contract an toàn, nhanh, và mạnh mẽ.',
  7:  'DeFi protocols phức tạp — nhưng bạn đã sẵn sàng. Tiếp tục xây dựng!',
  8:  'Systems programming là nền tảng của mọi thứ. Bạn đang làm chủ tầng sâu nhất.',
  9:  'ZK Proofs là biên giới cuối cùng của cryptography. Bạn đang tiến vào đây.',
  10: 'Bạn đã đến đây rồi. Web3 job đang chờ — hãy cho họ thấy bạn xứng đáng.',
};

const PHASE_GRADIENTS: Record<number, [string, string]> = {
  1:  ['#F97316', '#EA580C'],
  2:  ['#F59E0B', '#D97706'],
  3:  ['#EF4444', '#DC2626'],
  4:  ['#EAB308', '#CA8A04'],
  5:  ['#8B5CF6', '#7C3AED'],
  6:  ['#7C3AED', '#6D28D9'],
  7:  ['#3B82F6', '#2563EB'],
  8:  ['#06B6D4', '#0891B2'],
  9:  ['#10B981', '#059669'],
  10: ['#EC4899', '#DB2777'],
};

export function DashboardHero() {
  const { currentPhase, startDate } = useProgressStore();
  const phase = PHASES.find((p) => p.id === currentPhase);
  const dayNum = getDaysSinceStart(startDate);
  const greeting = getGreeting();
  const quote = PHASE_QUOTES[currentPhase] ?? PHASE_QUOTES[1];
  const [colorA, colorB] = PHASE_GRADIENTS[currentPhase] ?? ['#F97316', '#EA580C'];

  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colorA}12, ${colorB}08, var(--card))`,
        border: `1px solid ${colorA}25`,
      }}
    >
      {/* Decorative top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colorA}, ${colorB}, transparent)` }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: colorA }}
      />
      <div
        className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-10"
        style={{ background: colorB }}
      />

      <div className="relative">
        {/* Greeting + day info */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white leading-tight">
              {greeting}!
            </h1>
            <p className="text-sm mt-0.5 font-medium" style={{ color: `${colorA}` }}>
              Ngày {dayNum} · Phase {currentPhase} — {phase?.shortName}
            </p>
          </div>

          {/* Phase badge */}
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: `${colorA}22`, color: colorA, border: `1px solid ${colorA}33` }}
          >
            <span className="text-base">{phase?.icon}</span>
            {phase?.name}
          </span>
        </div>

        {/* Motivational quote */}
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,232,240,0.65)' }}>
          {quote}
        </p>
      </div>
    </div>
  );
}

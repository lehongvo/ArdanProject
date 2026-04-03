import { TodayCard } from '@/components/dashboard/TodayCard';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { PhaseProgress } from '@/components/dashboard/PhaseProgress';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { DashboardHero } from '@/components/dashboard/DashboardHero';

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      {/* Hero greeting */}
      <DashboardHero />

      {/* Quick stats */}
      <QuickStats />

      {/* Today + Streak side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TodayCard />
        </div>
        <StreakCounter />
      </div>

      {/* Phase progress */}
      <PhaseProgress />
    </div>
  );
}

'use client';

interface HeatMapProps {
  activityDates: string[]; // ISO date strings
}

function getLast52Weeks(): string[][] {
  const weeks: string[][] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from 52 weeks ago, on Sunday
  const start = new Date(today);
  start.setDate(start.getDate() - 363);
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const current = new Date(start);
  while (current <= today) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      if (current <= today) {
        week.push(current.toISOString().split('T')[0]);
      } else {
        week.push('');
      }
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export function HeatMap({ activityDates }: HeatMapProps) {
  const weeks = getLast52Weeks();
  const activitySet = new Set(activityDates);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const totalActive = activityDates.length;

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((date, di) => {
                if (!date) return <div key={di} className="w-3 h-3" />;
                const active = activitySet.has(date);
                const isToday = date === new Date().toISOString().split('T')[0];
                return (
                  <div
                    key={date}
                    title={date}
                    className={`w-3 h-3 rounded-sm transition-colors ${
                      isToday
                        ? 'ring-1 ring-white/50'
                        : ''
                    }`}
                    style={{
                      background: active ? '#8B5CF6' : '#1a1a1a',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-[#888]">{totalActive} ngày học trong 52 tuần qua</p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#555]">Ít</span>
          {[0, 0.3, 0.6, 1].map((opacity, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: opacity === 0 ? '#1a1a1a' : `rgba(139,92,246,${opacity})` }}
            />
          ))}
          <span className="text-[10px] text-[#555]">Nhiều</span>
        </div>
      </div>
    </div>
  );
}

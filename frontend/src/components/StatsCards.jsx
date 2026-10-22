import { LayoutGrid, CircleCheck, Flame, ChartColumn } from "lucide-react";

function ProgressRing({ percent }) {
  return (
    <div className="ring" aria-label={`${percent}% completed today`}>
      <svg viewBox="0 0 60 60" width="60" height="60">
        <circle className="ring-track" cx="30" cy="30" r="24" pathLength="100" />
        <circle
          className="ring-fill"
          cx="30"
          cy="30"
          r="24"
          pathLength="100"
          strokeDasharray={`${percent} 100`}
          transform="rotate(-90 30 30)"
        />
      </svg>
      <span className="ring-text">{percent}%</span>
    </div>
  );
}

export default function StatsCards({ overview }) {
  const cards = [
    {
      label: "Total Habits",
      value: overview.total,
      note: `${overview.total} ${overview.total === 1 ? "habit" : "habits"} tracked`,
      icon: LayoutGrid,
      tone: "purple",
    },
    {
      label: "Completed Today",
      value: `${overview.completedToday} / ${overview.total}`,
      note: `${overview.todayPercent}% done today`,
      icon: CircleCheck,
      tone: "mint",
      ring: overview.todayPercent,
    },
    {
      label: "Best Streak",
      value: `${overview.bestStreak} ${overview.bestStreak === 1 ? "day" : "days"}`,
      note: "Longest run so far",
      icon: Flame,
      tone: "peach",
    },
    {
      label: "Weekly Completion",
      value: `${overview.weeklyPercent}%`,
      note: "Last 7 days, all habits",
      icon: ChartColumn,
      tone: "blue",
      progress: overview.weeklyPercent,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className={`stat-card tone-${card.tone}`}>
            <div className="stat-icon">
              <Icon size={22} />
            </div>
            <div className="stat-body">
              <div className="stat-label">{card.label}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-note">{card.note}</div>
              {card.progress !== undefined && (
                <div className="progress stat-bar">
                  <div className="progress-fill" style={{ width: `${card.progress}%` }} />
                </div>
              )}
            </div>
            {card.ring !== undefined && <ProgressRing percent={card.ring} />}
          </div>
        );
      })}
    </div>
  );
}
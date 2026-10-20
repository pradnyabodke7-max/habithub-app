import { LayoutGrid, CircleCheck, Flame, ChartColumn } from "lucide-react";

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
          </div>
        );
      })}
    </div>
  );
}
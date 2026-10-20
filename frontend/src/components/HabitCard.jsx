import { Check, Undo2, Pencil, Trash2, Flame } from "lucide-react";
import { CATEGORY_META } from "../utils/categories";

export default function HabitCard({ habit, busy, onToggle, onEdit, onDelete }) {
  const meta = CATEGORY_META[habit.category];
  const Icon = meta.icon;

  return (
    <article className={`habit-card ${meta.className} ${habit.doneToday ? "done" : ""}`}>
      <div className="habit-icon">
        <Icon size={22} />
      </div>

      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        <div className="habit-meta">
          <span className="badge">{habit.category}</span>
          {habit.dailyGoal && <span className="goal">Goal: {habit.dailyGoal}</span>}
        </div>
      </div>

      <div className="habit-streak">
        <div className="streak-now">
          <Flame size={16} />
          {habit.currentStreak} day streak
        </div>
        <div className="streak-best">Best: {habit.bestStreak} days</div>
      </div>

      <div className="habit-week">
        <div className="week-top">
          <span>{habit.weekCount}/7 days</span>
          <strong>{habit.weekPercent}%</strong>
        </div>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${habit.weekPercent}%` }} />
        </div>
      </div>

      <div className="habit-check">
        <button
          className={`check-btn ${habit.doneToday ? "checked" : ""}`}
          onClick={() => onToggle(habit)}
          disabled={busy}
        >
          {habit.doneToday ? <Undo2 size={15} /> : <Check size={15} />}
          {habit.doneToday ? "Undo" : "Done"}
        </button>
      </div>

      <div className="habit-actions">
        <button className="icon-action" aria-label="Edit habit" onClick={() => onEdit(habit)}>
          <Pencil size={16} />
        </button>
        <button
          className="icon-action danger"
          aria-label="Delete habit"
          onClick={() => onDelete(habit)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
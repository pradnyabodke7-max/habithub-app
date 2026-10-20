import { useState } from "react";
import { CircleCheck } from "lucide-react";
import Heatmap from "../components/Heatmap";
import { toDateKey, formatDate } from "../utils/dates";

export default function CalendarPage({ habits, checkins, counts }) {
  const [selected, setSelected] = useState(toDateKey());

  const doneHabits = habits.filter((h) =>
    checkins.some((c) => String(c.habit) === h._id && c.date === selected)
  );

  return (
    <>
      <section className="card">
        <div className="card-head">
          <div>
            <h2>Activity Calendar</h2>
            <p className="card-sub">Last 90 days. Click a day to see what you completed.</p>
          </div>
        </div>
        <Heatmap
          counts={counts}
          totalHabits={habits.length}
          days={90}
          selected={selected}
          onSelect={setSelected}
        />
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>{formatDate(selected)}</h2>
            <p className="card-sub">
              {doneHabits.length} of {habits.length}{" "}
              {habits.length === 1 ? "habit" : "habits"} completed
            </p>
          </div>
        </div>

        {doneHabits.length === 0 ? (
          <p className="muted-text">No habits were completed on this day.</p>
        ) : (
          <ul className="day-list">
            {doneHabits.map((h) => (
              <li key={h._id} className="day-item">
                <CircleCheck size={18} />
                <span>{h.name}</span>
                <span className="goal">{h.category}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
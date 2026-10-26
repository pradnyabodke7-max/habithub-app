import { Flame, Trophy } from "lucide-react";
import { CATEGORY_META } from "../utils/categories";

export default function StreaksPage({ habits }) {
  const sorted = [...habits].sort(
    (a, b) => b.currentStreak - a.currentStreak || b.bestStreak - a.bestStreak
  );

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2>Streak Report</h2>
          <p className="card-sub">Current and best streak for every habit</p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty">
          <h3>No habits yet</h3>
          <p>Add a habit to see its streaks here.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Habit</th>
                <th>Category</th>
                <th>Current Streak</th>
                <th>Best Streak</th>
                <th>Today</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => {
                const meta = CATEGORY_META[h.category];
                return (
                  <tr key={h._id}>
                    <td>{i + 1}</td>
                    <td className="strong">{h.name}</td>
                    <td>
                      <span className={`badge ${meta.className}`}>{h.category}</span>
                    </td>
                    <td>
                      <span className="streak-pill">
                        <Flame size={14} /> {h.currentStreak}{" "}
                        {h.currentStreak === 1 ? "day" : "days"}
                      </span>
                    </td>
                    <td>
                      <span className="best-pill">
                        <Trophy size={14} /> {h.bestStreak}{" "}
                        {h.bestStreak === 1 ? "day" : "days"}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${h.doneToday ? "status-done" : "status-pending"}`}>
                        {h.doneToday ? "Done" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
import { CATEGORY_META } from "../utils/categories";

export default function WeeklyPage({ habits, overview }) {
  const sorted = [...habits].sort((a, b) => b.weekPercent - a.weekPercent);

  return (
    <>
      <section className="card summary-card">
        <div className="summary-number">{overview.weeklyPercent}%</div>
        <div className="summary-body">
          <h2>Weekly Completion</h2>
          <p>Across all habits in the last 7 days</p>
          <div className="progress">
            <div className="progress-fill" style={{ width: `${overview.weeklyPercent}%` }} />
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>Weekly Progress by Habit</h2>
            <p className="card-sub">Days completed out of the last 7</p>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="empty">
            <h3>No habits yet</h3>
            <p>Add a habit to see its weekly progress here.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Habit</th>
                  <th>Category</th>
                  <th>Days Completed</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((h) => {
                  const meta = CATEGORY_META[h.category];
                  return (
                    <tr key={h._id}>
                      <td className="strong">{h.name}</td>
                      <td>
                        <span className={`badge ${meta.className}`}>{h.category}</span>
                      </td>
                      <td>{h.weekCount} / 7 days</td>
                      <td>
                        <div className="week-cell">
                          <div className="progress">
                            <div
                              className="progress-fill"
                              style={{ width: `${h.weekPercent}%` }}
                            />
                          </div>
                          <strong>{h.weekPercent}%</strong>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
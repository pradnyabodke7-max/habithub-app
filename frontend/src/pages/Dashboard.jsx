import StatsCards from "../components/StatsCards";
import HabitList from "../components/HabitList";
import Heatmap from "../components/Heatmap";

export default function Dashboard({ overview, counts, listProps }) {
  return (
    <>
      <StatsCards overview={overview} />
      <HabitList title="My Habits" {...listProps} />
      <section className="card">
        <div className="card-head">
          <div>
            <h2>Habit Completion Heatmap</h2>
            <p className="card-sub">Last 12 weeks. Darker green means more habits completed.</p>
          </div>
        </div>
        <Heatmap counts={counts} totalHabits={overview.total} days={84} />
      </section>
    </>
  );
}
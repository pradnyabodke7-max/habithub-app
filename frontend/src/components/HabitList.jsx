import { Plus, SearchX, Sprout } from "lucide-react";
import HabitCard from "./HabitCard";
import SearchFilter from "./SearchFilter";

export default function HabitList({
  title,
  habits,
  totalCount,
  category,
  onCategoryChange,
  onAdd,
  onToggle,
  onEdit,
  onDelete,
  busyId,
}) {
  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2>{title}</h2>
          <p className="card-sub">
            {totalCount} total {totalCount === 1 ? "habit" : "habits"}
          </p>
        </div>
        <div className="toolbar">
          <SearchFilter category={category} onChange={onCategoryChange} />
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={16} /> Add Habit
          </button>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <Sprout size={26} />
          </div>
          <h3>No habits yet</h3>
          <p>Add your first habit and start building a streak today.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={16} /> Add your first habit
          </button>
        </div>
      ) : habits.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <SearchX size={26} />
          </div>
          <h3>No matching habits</h3>
          <p>Try a different search word or choose another category.</p>
        </div>
      ) : (
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              busy={busyId === habit._id}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
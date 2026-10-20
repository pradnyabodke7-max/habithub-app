import { LayoutDashboard, ListChecks, CalendarDays, Sprout } from "lucide-react";

const ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "habits", label: "All Habits", icon: ListChecks },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
];

export default function Sidebar({ view, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <Sprout size={22} />
        </div>
        <div>
          <div className="brand-name">HabitHub</div>
          <div className="brand-tag">Build Better Habits Every Day</div>
        </div>
      </div>

      <nav className="nav">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? "active" : ""}`}
              onClick={() => onChange(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <p className="sidebar-note">Small steps every day lead to big changes.</p>
    </aside>
  );
}
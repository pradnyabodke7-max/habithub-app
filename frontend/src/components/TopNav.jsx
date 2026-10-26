import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  ChartColumn,
  ChevronDown,
  Plus,
  LogOut,
  Menu,
  X,
  Sprout,
  ShieldCheck,
  Heart,
  BookOpen,
  Dumbbell,
  User,
  Flame,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

const MENUS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    action: { type: "view", view: "dashboard" },
  },
  {
    id: "habits",
    label: "Habits",
    icon: ListChecks,
    children: [
      { label: "All Habits", icon: ListChecks, action: { type: "view", view: "habits", category: "All" } },
      { label: "Add New Habit", icon: Plus, action: { type: "add" } },
      { label: "Health Habits", icon: Heart, action: { type: "view", view: "habits", category: "Health" } },
      { label: "Study Habits", icon: BookOpen, action: { type: "view", view: "habits", category: "Study" } },
      { label: "Fitness Habits", icon: Dumbbell, action: { type: "view", view: "habits", category: "Fitness" } },
      { label: "Personal Habits", icon: User, action: { type: "view", view: "habits", category: "Personal" } },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: ChartColumn,
    children: [
      { label: "Streaks", icon: Flame, action: { type: "view", view: "streaks" } },
      { label: "Weekly Progress", icon: TrendingUp, action: { type: "view", view: "weekly" } },
      { label: "Activity Calendar", icon: CalendarDays, action: { type: "view", view: "calendar" } },
    ],
  },
];

export default function TopNav({ view, category, user, onAction, onLogout }) {
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Close the dropdown when the user clicks anywhere outside the menu
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function run(action) {
    onAction(action);
    setOpenId(null);
    setMobileOpen(false);
  }

  return (
    <header className="topnav" ref={navRef}>
      <div className="topnav-inner">
        <div className="brand">
          <div className="brand-logo">
            <Sprout size={22} />
          </div>
          <div>
            <div className="brand-name">HabitHub</div>
            <div className="brand-tag">Build Better Habits Every Day</div>
          </div>
        </div>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`topnav-menu ${mobileOpen ? "open" : ""}`}>
          {MENUS.map((menu) => {
            const Icon = menu.icon;

            if (!menu.children) {
              return (
                <button
                  key={menu.id}
                  className={`topnav-link ${menu.action.view === view ? "active" : ""}`}
                  onClick={() => run(menu.action)}
                >
                  <Icon size={17} />
                  {menu.label}
                </button>
              );
            }

            const isOpen = openId === menu.id;
            const groupActive = menu.children.some((c) => c.action.view === view);

            return (
              <div key={menu.id} className="topnav-group">
                <button
                  className={`topnav-link ${groupActive ? "active" : ""} ${isOpen ? "open" : ""}`}
                  onClick={() => setOpenId(isOpen ? null : menu.id)}
                  aria-expanded={isOpen}
                >
                  <Icon size={17} />
                  {menu.label}
                  <ChevronDown size={15} className="chev" />
                </button>

                {isOpen && (
                  <div className="dropdown">
                    {menu.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive =
                        child.action.type === "view" &&
                        child.action.view === view &&
                        (!child.action.category || child.action.category === category);
                      return (
                        <button
                          key={child.label}
                          className={`dropdown-item ${childActive ? "active" : ""}`}
                          onClick={() => run(child.action)}
                        >
                          <ChildIcon size={16} />
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="topnav-right">
          <button className="btn btn-primary btn-sm" onClick={() => run({ type: "add" })}>
            <Plus size={16} />
            <span className="hide-sm">Add Habit</span>
          </button>
          <div className="user-chip">
            <ShieldCheck size={16} />
            <span>{user.name}</span>
            <em>{user.role === "admin" ? "Admin" : "User"}</em>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={16} />
            <span className="hide-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
import { useCallback, useEffect, useMemo, useState } from "react";
import { LoaderCircle, CircleAlert } from "lucide-react";
import {
  getHabits,
  getCheckins,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleCheckin,
  TOKEN_KEY,
  USER_KEY,
} from "./services/api";
import { toDateKey } from "./utils/dates";
import { enrichHabits, calcOverview, countsByDate } from "./utils/stats";
import TopNav from "./components/TopNav";
import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import Toast from "./components/Toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllHabits from "./pages/AllHabits";
import CalendarPage from "./pages/CalendarPage";
import StreaksPage from "./pages/StreaksPage";
import WeeklyPage from "./pages/WeeklyPage";

function HabitApp({ user, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [formState, setFormState] = useState({ open: false, habit: null });
  const [toast, setToast] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const closeToast = useCallback(() => setToast(null), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const [habitData, checkinData] = await Promise.all([getHabits(), getCheckins()]);
      setHabits(habitData);
      setCheckins(checkinData);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const enriched = useMemo(() => enrichHabits(habits, checkins), [habits, checkins]);
  const overview = useMemo(() => calcOverview(enriched), [enriched]);
  const counts = useMemo(() => countsByDate(checkins), [checkins]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enriched.filter(
      (h) =>
        h.name.toLowerCase().includes(term) &&
        (category === "All" || h.category === category)
    );
  }, [enriched, search, category]);

  function handleMenuAction(action) {
    if (action.type === "add") {
      setFormState({ open: true, habit: null });
      return;
    }
    setView(action.view);
    if (action.category) setCategory(action.category);
  }

  async function handleToggle(habit) {
    setBusyId(habit._id);
    try {
      const today = toDateKey();
      const result = await toggleCheckin(habit._id, today);
      setCheckins((prev) => {
        const without = prev.filter(
          (c) => !(String(c.habit) === habit._id && c.date === today)
        );
        return result.checked ? [...without, { habit: habit._id, date: today }] : without;
      });
      showToast(result.checked ? `${habit.name} marked as done` : `${habit.name} marked as undone`);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setBusyId(null);
    }
  }

  async function handleSave(data) {
    if (formState.habit) {
      const updated = await updateHabit(formState.habit._id, data);
      setHabits((prev) => prev.map((h) => (h._id === updated._id ? updated : h)));
      showToast("Habit updated successfully");
    } else {
      const created = await createHabit(data);
      setHabits((prev) => [...prev, created]);
      showToast("Habit added successfully");
    }
    setFormState({ open: false, habit: null });
  }

  async function handleDelete(habit) {
    const sure = window.confirm(
      `Delete "${habit.name}"? All its check-ins will be removed too.`
    );
    if (!sure) return;
    try {
      await deleteHabit(habit._id);
      setHabits((prev) => prev.filter((h) => h._id !== habit._id));
      setCheckins((prev) => prev.filter((c) => String(c.habit) !== habit._id));
      showToast("Habit deleted");
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  const listProps = {
    habits: filtered,
    totalCount: habits.length,
    category,
    onCategoryChange: setCategory,
    onAdd: () => setFormState({ open: true, habit: null }),
    onToggle: handleToggle,
    onEdit: (habit) => setFormState({ open: true, habit }),
    onDelete: handleDelete,
    busyId,
  };

  let content;
  if (loading) {
    content = (
      <div className="card state-box">
        <LoaderCircle size={32} className="spin" />
        <p>Loading your habits...</p>
      </div>
    );
  } else if (loadError) {
    content = (
      <div className="card state-box error-box">
        <CircleAlert size={32} />
        <p>{loadError}</p>
        <button className="btn btn-primary" onClick={loadData}>
          Try again
        </button>
      </div>
    );
  } else if (view === "dashboard") {
    content = <Dashboard overview={overview} counts={counts} listProps={listProps} />;
  } else if (view === "habits") {
    content = <AllHabits listProps={listProps} />;
  } else if (view === "streaks") {
    content = <StreaksPage habits={enriched} />;
  } else if (view === "weekly") {
    content = <WeeklyPage habits={enriched} overview={overview} />;
  } else {
    content = <CalendarPage habits={habits} checkins={checkins} counts={counts} />;
  }

  return (
    <div className="app-shell">
      <TopNav
        view={view}
        category={category}
        user={user}
        onAction={handleMenuAction}
        onLogout={onLogout}
      />
      <main className="main">
        <Header
          name={user.name}
          search={search}
          onSearch={setSearch}
          showSearch={view === "dashboard" || view === "habits"}
        />
        {content}
      </main>

      {formState.open && (
        <HabitForm
          habit={formState.habit}
          onSave={handleSave}
          onCancel={() => setFormState({ open: false, habit: null })}
        />
      )}

      {toast && (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return localStorage.getItem(TOKEN_KEY) && raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  });

  function handleLogin(data) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <HabitApp user={user} onLogout={handleLogout} />;
}
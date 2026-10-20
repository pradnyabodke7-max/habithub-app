import { useState } from "react";
import { X, LoaderCircle, CircleAlert } from "lucide-react";
import { CATEGORIES, CATEGORY_META } from "../utils/categories";

export default function HabitForm({ habit, onSave, onCancel }) {
  const isEdit = Boolean(habit);
  const [name, setName] = useState(habit ? habit.name : "");
  const [category, setCategory] = useState(habit ? habit.category : "Health");
  const [dailyGoal, setDailyGoal] = useState(habit ? habit.dailyGoal || "" : "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedGoal = dailyGoal.trim();

    if (trimmedName.length < 2) {
      setError("Habit name must be at least 2 characters");
      return;
    }
    if (trimmedName.length > 50) {
      setError("Habit name must be under 50 characters");
      return;
    }
    if (trimmedGoal.length > 60) {
      setError("Daily goal must be under 60 characters");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSave({ name: trimmedName, category, dailyGoal: trimmedGoal });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{isEdit ? "Edit Habit" : "Add New Habit"}</h2>
          <button className="icon-btn" aria-label="Close" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>
              Habit Name <em>*</em>
            </span>
            <input
              type="text"
              placeholder="e.g. Read a book"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </label>

          <div className="field">
            <span>
              Category <em>*</em>
            </span>
            <div className="cat-options">
              {CATEGORIES.map((c) => {
                const meta = CATEGORY_META[c];
                const Icon = meta.icon;
                return (
                  <button
                    type="button"
                    key={c}
                    className={`cat-option ${meta.className} ${category === c ? "selected" : ""}`}
                    onClick={() => setCategory(c)}
                  >
                    <Icon size={15} />
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="field">
            <span>Daily Goal (optional)</span>
            <input
              type="text"
              placeholder="e.g. 30 minutes, 2L water"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
            />
          </label>

          {error && (
            <div className="form-error">
              <CircleAlert size={16} /> {error}
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving && <LoaderCircle size={16} className="spin" />}
              {isEdit ? "Save Changes" : "Add Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
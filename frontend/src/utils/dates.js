// All dates are "YYYY-MM-DD" strings in the user's local time zone.

export function toDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(key, amount) {
  const [y, m, d] = key.split("-").map(Number);
  return toDateKey(new Date(y, m - 1, d + amount));
}

// Last n date keys, oldest first, ending today
export function lastNDays(n) {
  const today = toDateKey();
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(addDays(today, -i));
  }
  return days;
}

export function formatDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
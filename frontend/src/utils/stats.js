import { toDateKey, addDays, lastNDays } from "./dates";

export function buildCheckinMap(checkins) {
  const map = new Map();
  checkins.forEach((c) => {
    const id = String(c.habit);
    if (!map.has(id)) map.set(id, new Set());
    map.get(id).add(c.date);
  });
  return map;
}

// Counts back from today. If today is not checked in yet, the streak
// still counts from yesterday, so it is not lost until the day ends.
export function calcCurrentStreak(dates) {
  const today = toDateKey();
  let cursor = dates.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (dates.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// Longest run of consecutive days in all history
export function calcBestStreak(dates) {
  const sorted = [...dates].sort();
  let best = 0;
  let run = 0;
  let previous = null;
  sorted.forEach((date) => {
    run = previous && addDays(previous, 1) === date ? run + 1 : 1;
    if (run > best) best = run;
    previous = date;
  });
  return best;
}

// Completions in the last 7 calendar days (including today)
export function calcWeekCount(dates) {
  return lastNDays(7).filter((day) => dates.has(day)).length;
}

export function enrichHabits(habits, checkins) {
  const map = buildCheckinMap(checkins);
  const today = toDateKey();
  return habits.map((habit) => {
    const dates = map.get(String(habit._id)) || new Set();
    const weekCount = calcWeekCount(dates);
    return {
      ...habit,
      doneToday: dates.has(today),
      currentStreak: calcCurrentStreak(dates),
      bestStreak: calcBestStreak(dates),
      weekCount,
      weekPercent: Math.round((weekCount / 7) * 100),
    };
  });
}

export function calcOverview(enrichedHabits) {
  const total = enrichedHabits.length;
  const completedToday = enrichedHabits.filter((h) => h.doneToday).length;
  const bestStreak = enrichedHabits.reduce((max, h) => Math.max(max, h.bestStreak), 0);
  const weekTotal = enrichedHabits.reduce((sum, h) => sum + h.weekCount, 0);
  const weeklyPercent = total === 0 ? 0 : Math.round((weekTotal / (total * 7)) * 100);
  const todayPercent = total === 0 ? 0 : Math.round((completedToday / total) * 100);
  return { total, completedToday, bestStreak, weeklyPercent, todayPercent };
}

// Habits completed on each date, used by the heatmap
export function countsByDate(checkins) {
  const counts = {};
  checkins.forEach((c) => {
    counts[c.date] = (counts[c.date] || 0) + 1;
  });
  return counts;
}
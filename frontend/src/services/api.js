const BASE = "/api";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (error) {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const getHabits = () => request("/habits");

export const createHabit = (habit) =>
  request("/habits", { method: "POST", body: JSON.stringify(habit) });

export const updateHabit = (id, habit) =>
  request(`/habits/${id}`, { method: "PUT", body: JSON.stringify(habit) });

export const deleteHabit = (id) =>
  request(`/habits/${id}`, { method: "DELETE" });

export const getCheckins = () => request("/checkins");

export const toggleCheckin = (habitId, date) =>
  request("/checkins/toggle", {
    method: "POST",
    body: JSON.stringify({ habitId, date }),
  });
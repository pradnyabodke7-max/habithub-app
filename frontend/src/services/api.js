const BASE = "/api";

export const TOKEN_KEY = "habithub_token";
export const USER_KEY = "habithub_user";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE}${path}`, { ...options, headers });
  } catch (error) {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Expired or missing token: clear it and go back to the login page
    if (response.status === 401 && path !== "/auth/login") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const login = (username, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

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
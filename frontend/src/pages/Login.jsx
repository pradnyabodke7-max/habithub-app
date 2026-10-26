import { useState } from "react";
import {
  Sprout,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  LoaderCircle,
  CircleAlert,
  ShieldCheck,
  Flame,
  CalendarDays,
  ChartColumn,
} from "lucide-react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter your username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await login(username.trim(), password);
      onLogin(data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="brand">
          <div className="brand-logo">
            <Sprout size={22} />
          </div>
          <div>
            <div className="brand-name">HabitHub</div>
            <div className="brand-tag">Build Better Habits Every Day</div>
          </div>
        </div>

        <div>
          <h2>Small steps every day lead to big changes.</h2>
          <p>
            Track your habits, build streaks and see your progress in one clean
            dashboard.
          </p>
        </div>

        <ul className="login-points">
          <li>
            <Flame size={18} /> Current and best streak tracking
          </li>
          <li>
            <ChartColumn size={18} /> Weekly progress reports
          </li>
          <li>
            <CalendarDays size={18} /> Activity calendar heatmap
          </li>
        </ul>
      </div>

      <div className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-icon">
            <ShieldCheck size={26} />
          </div>
          <h1>Admin Login</h1>
          <p className="login-sub">Sign in to manage your habits</p>

          <label className="field">
            <span>Username</span>
            <div className="input-icon">
              <User size={17} />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
          </label>

          <label className="field">
            <span>Password</span>
            <div className="input-icon">
              <Lock size={17} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                aria-label="Show or hide password"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="form-error">
              <CircleAlert size={16} /> {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <LoaderCircle size={16} className="spin" /> : <LogIn size={16} />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
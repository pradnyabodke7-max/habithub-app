import { Sprout, PartyPopper, Flame, Target } from "lucide-react";

function getMessage(overview) {
  const { total, completedToday, todayPercent, bestStreak } = overview;

  if (total === 0) {
    return {
      icon: Sprout,
      title: "Let's get started!",
      text: "Add your first habit and begin building a streak today.",
    };
  }
  if (completedToday === total) {
    return {
      icon: PartyPopper,
      title: "Perfect day!",
      text: "You completed every habit today. Amazing consistency!",
    };
  }
  if (completedToday === 0) {
    return {
      icon: Target,
      title: "A fresh start",
      text: "Pick one habit and tick it off. Small steps build big streaks.",
    };
  }
  if (todayPercent >= 50) {
    return {
      icon: Flame,
      title: "You're doing great!",
      text: `Only ${total - completedToday} more to go today. Finish strong!`,
    };
  }
  return {
    icon: Sprout,
    title: "Good start!",
    text: bestStreak > 0
      ? `Your best streak is ${bestStreak} ${bestStreak === 1 ? "day" : "days"}. Keep it going!`
      : "Consistency today builds the results of tomorrow.",
  };
}

export default function MotivationCard({ overview }) {
  const message = getMessage(overview);
  const Icon = message.icon;

  return (
    <section className="motivation">
      <div className="motivation-icon">
        <Icon size={28} />
      </div>
      <div>
        <h3>{message.title}</h3>
        <p>{message.text}</p>
      </div>
      <div className="motivation-bar">
        <span>{overview.completedToday} of {overview.total} done today</span>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${overview.todayPercent}%` }} />
        </div>
      </div>
    </section>
  );
}
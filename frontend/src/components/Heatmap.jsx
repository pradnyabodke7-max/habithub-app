import { useMemo, useState } from "react";
import { lastNDays, formatDate, toDateKey } from "../utils/dates";

function getLevel(count, total) {
  if (!count || !total) return 0;
  const ratio = count / total;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export default function Heatmap({ counts, totalHabits, days = 84, selected, onSelect }) {
  const [hovered, setHovered] = useState(null);

  const { list, offset } = useMemo(() => {
    const dayList = lastNDays(days);
    const [y, m, d] = dayList[0].split("-").map(Number);
    // Pad the first column so every row is the same weekday (Sun at top)
    return { list: dayList, offset: new Date(y, m - 1, d).getDay() };
  }, [days]);

  const today = toDateKey();
  const hoveredCount = hovered ? counts[hovered] || 0 : 0;

  return (
    <div>
      <div className="heat-info">
        {hovered ? (
          <>
            <strong>{formatDate(hovered)}</strong>: {hoveredCount} of {totalHabits}{" "}
            {totalHabits === 1 ? "habit" : "habits"} completed
          </>
        ) : (
          "Hover over a day to see the date and completion count"
        )}
      </div>

      <div className="heat-scroll">
        <div className="heat-grid">
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {list.map((day) => {
            const count = counts[day] || 0;
            return (
              <button
                key={day}
                className={`heat-cell lvl-${getLevel(count, totalHabits)} ${
                  selected === day ? "selected" : ""
                } ${day === today ? "today" : ""}`}
                title={`${formatDate(day)}: ${count} completed`}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(day)}
                onBlur={() => setHovered(null)}
                onClick={() => onSelect && onSelect(day)}
              />
            );
          })}
        </div>
      </div>

      <div className="heat-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className={`legend-box lvl-${level}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
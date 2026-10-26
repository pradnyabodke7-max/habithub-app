import { Search, X } from "lucide-react";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Header({ name, search, onSearch, showSearch }) {
  const displayName = name ? name[0].toUpperCase() + name.slice(1) : "";

  return (
    <header className="header">
      <div>
        <h1>
          {greeting()}, {displayName}!
        </h1>
        <p>Consistency beats intensity. Keep showing up every day.</p>
      </div>

      {showSearch && (
        <div className="header-right">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            {search && (
              <button
                className="icon-btn"
                aria-label="Clear search"
                onClick={() => onSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
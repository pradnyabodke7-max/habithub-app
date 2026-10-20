import { CATEGORIES } from "../utils/categories";

export default function SearchFilter({ category, onChange }) {
  return (
    <select
      className="select"
      value={category}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
    >
      <option value="All">All Categories</option>
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function FilterBar({ activeFilter, onChange }) {
  return (
    <div className="filter-tabs">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`filter-tab ${activeFilter === filter.value ? "is-active" : ""}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

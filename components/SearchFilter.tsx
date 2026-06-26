'use client';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }[];
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  filters = [],
}: SearchFilterProps) {
  return (
    <div className="search-filter-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {filters.map((filter, i) => (
        <select
          key={i}
          id={`filter-${filter.label.toLowerCase().replace(/\s+/g, '-')}`}
          className="filter-select"
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

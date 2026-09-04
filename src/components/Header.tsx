import React from 'react';
import { Search, Plus } from 'lucide-react';
import { FilterStatus } from '../types';
import './Header.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  onAddNew: () => void;
}

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All Scholarships' },
  { value: 'draft', label: 'Draft' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
];

export function Header({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onAddNew,
}: HeaderProps) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>🎓 Scholarship Tracker</h1>
          <p>Keep track of your scholarship applications and opportunities</p>
        </div>

        <div className="header-controls">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value as FilterStatus)}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className="btn btn-primary btn-add-new" onClick={onAddNew}>
            <Plus size={20} />
            Add Scholarship
          </button>
        </div>
      </div>
    </div>
  );
}

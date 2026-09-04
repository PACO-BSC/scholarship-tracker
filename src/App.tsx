import React, { useState, useMemo } from 'react';
import { ScholarshipProvider, useScholarships } from './context/ScholarshipContext';
import { Header, ScholarshipCard, ScholarshipModal, StatisticsPanel } from './components';
import { Scholarship } from './types';
import { calculateStatistics } from './utils/helpers';
import './App.css';

function AppContent() {
  const { scholarships, filterStatus, setFilterStatus, addScholarship, updateScholarship, deleteScholarship, searchScholarships } = useScholarships();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search scholarships
  const filteredScholarships = useMemo(() => {
    let result = scholarships;

    // Apply search
    if (searchQuery) {
      result = searchScholarships(searchQuery);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter((s) => s.status === filterStatus);
    }

    // Sort by deadline (closest first)
    return result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [scholarships, filterStatus, searchQuery, searchScholarships]);

  const stats = calculateStatistics(scholarships);

  const handleAddNew = () => {
    setSelectedScholarship(null);
    setIsModalOpen(true);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const handleSave = (scholarship: Scholarship) => {
    if (selectedScholarship) {
      updateScholarship(scholarship.id, scholarship);
    } else {
      addScholarship(scholarship);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      deleteScholarship(id);
    }
  };

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onAddNew={handleAddNew}
      />

      <div className="app-container">
        <StatisticsPanel stats={stats} />

        {filteredScholarships.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <p className="empty-icon">📚</p>
              <h2>No Scholarships Found</h2>
              <p>Start by adding your first scholarship to track your applications.</p>
              <button className="btn btn-primary" onClick={handleAddNew}>
                Add Your First Scholarship
              </button>
            </div>
          </div>
        ) : (
          <div className="scholarships-grid">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ScholarshipModal
        scholarship={selectedScholarship}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedScholarship(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

export default function App() {
  return (
    <ScholarshipProvider>
      <AppContent />
    </ScholarshipProvider>
  );
}

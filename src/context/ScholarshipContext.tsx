import React, { createContext, useContext } from 'react';
import { Scholarship, FilterStatus } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';

interface ScholarshipContextType {
  scholarships: Scholarship[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  addScholarship: (scholarship: Omit<Scholarship, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateScholarship: (id: string, updates: Partial<Scholarship>) => void;
  deleteScholarship: (id: string) => void;
  searchScholarships: (query: string) => Scholarship[];
}

const ScholarshipContext = createContext<ScholarshipContextType | undefined>(undefined);

export function ScholarshipProvider({ children }: { children: React.ReactNode }) {
  const [scholarships, setScholarships] = useLocalStorage<Scholarship[]>('scholarships', []);
  const [filterStatus, setFilterStatus] = useLocalStorage<FilterStatus>('filterStatus', 'all');

  const addScholarship = (scholarship: Omit<Scholarship, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newScholarship: Scholarship = {
      ...scholarship,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setScholarships([...scholarships, newScholarship]);
  };

  const updateScholarship = (id: string, updates: Partial<Scholarship>) => {
    setScholarships(
      scholarships.map((scholarship) =>
        scholarship.id === id
          ? { ...scholarship, ...updates, updatedAt: new Date().toISOString() }
          : scholarship
      )
    );
  };

  const deleteScholarship = (id: string) => {
    setScholarships(scholarships.filter((scholarship) => scholarship.id !== id));
  };

  const searchScholarships = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return scholarships.filter(
      (scholarship) =>
        scholarship.name.toLowerCase().includes(lowerQuery) ||
        scholarship.organization.toLowerCase().includes(lowerQuery) ||
        scholarship.notes.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        filterStatus,
        setFilterStatus,
        addScholarship,
        updateScholarship,
        deleteScholarship,
        searchScholarships,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useScholarships must be used within ScholarshipProvider');
  }
  return context;
}

import React from 'react';
import { CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';
import { Scholarship } from '../types';
import { formatDate, getDaysUntilDeadline, isDeadlinePassed, formatCurrency } from '../utils/helpers';
import './ScholarshipCard.css';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onEdit: (scholarship: Scholarship) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  draft: { color: 'gray', label: 'Draft' },
  'in-progress': { color: 'blue', label: 'In Progress' },
  submitted: { color: 'purple', label: 'Submitted' },
  accepted: { color: 'green', label: 'Accepted' },
  rejected: { color: 'red', label: 'Rejected' },
};

export function ScholarshipCard({ scholarship, onEdit, onDelete }: ScholarshipCardProps) {
  const config = statusConfig[scholarship.status];
  const daysUntil = getDaysUntilDeadline(scholarship.deadline);
  const deadlinePassed = isDeadlinePassed(scholarship.deadline);

  return (
    <div className="scholarship-card">
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{scholarship.name}</h3>
          <p className="card-organization">{scholarship.organization}</p>
        </div>
        <span className={`status-badge status-${config.color}`}>{config.label}</span>
      </div>

      <div className="card-content">
        <div className="card-amount">{formatCurrency(scholarship.amount)}</div>

        <div className="card-deadline">
          {deadlinePassed ? (
            <>
              <AlertCircle size={18} className="icon-warning" />
              <span>Deadline passed</span>
            </>
          ) : (
            <>
              <Clock size={18} className={daysUntil <= 7 ? 'icon-warning' : 'icon-info'} />
              <span>{daysUntil} days remaining</span>
            </>
          )}
        </div>

        {scholarship.requirements.length > 0 && (
          <div className="card-requirements">
            <strong>Requirements ({scholarship.requirements.length}):</strong>
            <ul>
              {scholarship.requirements.slice(0, 2).map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
              {scholarship.requirements.length > 2 && <li>+{scholarship.requirements.length - 2} more</li>}
            </ul>
          </div>
        )}

        {scholarship.essays.length > 0 && (
          <div className="card-meta">
            <FileText size={16} />
            <span>{scholarship.essays.length} essay(s)</span>
          </div>
        )}

        {scholarship.notes && (
          <div className="card-notes">
            <p>{scholarship.notes}</p>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => onEdit(scholarship)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(scholarship.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { Scholarship, FilterStatus } from '../types';
import { X } from 'lucide-react';
import { generateId } from '../utils/helpers';
import './ScholarshipModal.css';

interface ScholarshipModalProps {
  scholarship: Scholarship | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (scholarship: Scholarship) => void;
}

export function ScholarshipModal({ scholarship, isOpen, onClose, onSave }: ScholarshipModalProps) {
  const [formData, setFormData] = React.useState<Scholarship>(
    scholarship || {
      id: generateId(),
      name: '',
      organization: '',
      amount: 0,
      deadline: '',
      status: 'draft',
      requirements: [],
      essays: [],
      documents: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [requirementInput, setRequirementInput] = React.useState('');

  React.useEffect(() => {
    if (scholarship) {
      setFormData(scholarship);
    }
  }, [scholarship]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput],
      });
      setRequirementInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{scholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Scholarship Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Merit Based Scholarship"
              />
            </div>
            <div className="form-group">
              <label>Organization *</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g., University Name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount ($) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Deadline *</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Requirements</label>
            <div className="requirement-input-group">
              <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                placeholder="Add a requirement and press Enter"
              />
              <button type="button" onClick={addRequirement} className="btn-add">
                Add
              </button>
            </div>
            {formData.requirements.length > 0 && (
              <div className="requirements-list">
                {formData.requirements.map((req, idx) => (
                  <div key={idx} className="requirement-tag">
                    <span>{req}</span>
                    <button type="button" onClick={() => removeRequirement(idx)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {scholarship ? 'Update' : 'Create'} Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

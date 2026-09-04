import React from 'react';
import { TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Statistics } from '../types';
import { formatCurrency } from '../utils/helpers';
import './StatisticsPanel.css';

interface StatisticsPanelProps {
  stats: Statistics;
}

export function StatisticsPanel({ stats }: StatisticsPanelProps) {
  return (
    <div className="statistics-panel">
      <div className="stat-card">
        <div className="stat-icon stat-total">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Scholarships</p>
          <p className="stat-value">{stats.total}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-pending">
          <Clock size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Pending</p>
          <p className="stat-value">{stats.pending}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-submitted">
          <CheckCircle size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Submitted</p>
          <p className="stat-value">{stats.submitted}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-accepted">
          <CheckCircle size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Accepted</p>
          <p className="stat-value">{stats.accepted}</p>
          <p className="stat-amount">{formatCurrency(stats.acceptedAmount)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-rejected">
          <XCircle size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Rejected</p>
          <p className="stat-value">{stats.rejected}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-opportunity">
          <TrendingUp size={24} />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Opportunity</p>
          <p className="stat-value">{formatCurrency(stats.totalAmount)}</p>
        </div>
      </div>
    </div>
  );
}

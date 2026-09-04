export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  amount: number;
  deadline: string;
  status: 'draft' | 'in-progress' | 'submitted' | 'accepted' | 'rejected';
  requirements: string[];
  essays: Essay[];
  documents: Document[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Essay {
  id: string;
  title: string;
  prompt: string;
  content: string;
  wordCount: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export type FilterStatus = 'all' | 'draft' | 'in-progress' | 'submitted' | 'accepted' | 'rejected';

export interface Statistics {
  total: number;
  submitted: number;
  accepted: number;
  rejected: number;
  pending: number;
  totalAmount: number;
  acceptedAmount: number;
}

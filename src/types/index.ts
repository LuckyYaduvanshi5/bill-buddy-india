
export interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
  emoji?: string;
}

export type SplitMethod = 'equal' | 'custom';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // user id
  groupId?: string;
  participants: {
    userId: string;
    amount: number;
  }[];
  date: string;
  category?: string;
  notes?: string;
  receipt?: string;
  splitMethod: SplitMethod;
}

export interface Balance {
  userId: string;
  amount: number; // positive: they owe you, negative: you owe them
}

export type UPIApp = 'phonePe' | 'gPay' | 'paytm' | 'bhim';

export interface ExpenseFormData {
  title: string;
  amount: number;
  paidBy: string;
  participants: string[];
  splitMethod: SplitMethod;
  customSplits?: { [userId: string]: number };
  groupId?: string;
  category?: string;
  notes?: string;
  date: string;
}


export interface Account {
  id: string;
  type: "personal" | "joint";
  name: string;
  initial: string;
  partnerInitial?: string;
}

export interface CategoryTile {
  id: string;
  title: string;
  path: string;
  value: number;
  liability?: number;
  icon: string;
  color: string;
}

export interface Property {
  id: string;
  name: string;
  value: number;
  mortgages: Liability[];
}

export interface Investment {
  id: string;
  name: string;
  value: number;
  percentageChange: number;
  logo?: string;
  type: 'stock' | 'savings' | 'retirement' | 'children';
}

export interface Vehicle {
  id: string;
  name: string;
  value: number;
  loan?: Liability;
}

export interface Insurance {
  id: string;
  type: string;
  provider: string;
  coverage: number;
  premium: number;
  cashValue?: number;
  coverageRating: 'good' | 'warning' | 'alert';
  details?: string;
  beneficiaries?: string;
}

export interface Valuable {
  id: string;
  name: string;
  description?: string;
  value: number;
  type: 'art' | 'jewelry' | 'collectible' | 'business' | 'other';
  imageUrl?: string;
}

export interface Furniture extends Valuable {
  dueDate?: string;
  invited?: string[];
}

export interface Liability {
  id: string;
  name: string;
  originalAmount?: number;
  currentBalance: number;
  interestRate?: number;
  type: 'mortgage' | 'car' | 'personal' | 'credit' | 'other';
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: string;
}

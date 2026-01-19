export interface Transaction {
  id: string;
  merchant: string;
  category: 'shopping' | 'groceries' | 'food' | 'other';
  amount: number;
  date: string;
  icon?: string;
}

export interface CategoryData {
  name: string;
  type: 'shopping' | 'groceries' | 'food' | 'other';
  amount: number;
  percentage: number;
  color: string;
}

export const categoryColors = {
  shopping: '#fbc19a',
  groceries: '#ccf7bf',
  food: '#f9fc8a',
  other: '#d3c4f0'
};

export const transactions: Transaction[] = [
  { id: '1', merchant: 'Amazon', category: 'shopping', amount: 249.99, date: '2026-01-18' },
  { id: '2', merchant: 'Whole Foods', category: 'groceries', amount: 87.45, date: '2026-01-18' },
  { id: '3', merchant: 'Starbucks', category: 'food', amount: 12.50, date: '2026-01-17' },
  { id: '4', merchant: 'Target', category: 'shopping', amount: 156.23, date: '2026-01-17' },
  { id: '5', merchant: 'Trader Joe\'s', category: 'groceries', amount: 64.32, date: '2026-01-16' },
  { id: '6', merchant: 'Netflix', category: 'other', amount: 15.99, date: '2026-01-15' },
  { id: '7', merchant: 'Chipotle', category: 'food', amount: 18.75, date: '2026-01-15' },
  { id: '8', merchant: 'Apple Store', category: 'shopping', amount: 329.00, date: '2026-01-14' },
  { id: '9', merchant: 'Safeway', category: 'groceries', amount: 92.18, date: '2026-01-14' },
  { id: '10', merchant: 'Uber Eats', category: 'food', amount: 34.25, date: '2026-01-13' },
  { id: '11', merchant: 'Best Buy', category: 'shopping', amount: 189.99, date: '2026-01-12' },
  { id: '12', merchant: 'Spotify', category: 'other', amount: 10.99, date: '2026-01-11' },
];

export const categoryData: CategoryData[] = [
  { name: 'Shopping', type: 'shopping', amount: 925.21, percentage: 38, color: categoryColors.shopping },
  { name: 'Groceries', type: 'groceries', amount: 243.95, percentage: 26, color: categoryColors.groceries },
  { name: 'Food & Dining', type: 'food', amount: 65.50, percentage: 21, color: categoryColors.food },
  { name: 'Other', type: 'other', amount: 26.98, percentage: 15, color: categoryColors.other },
];

export const totalBalance = 24350.00;
export const totalSpent = 1261.64;
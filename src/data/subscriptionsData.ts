export interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  nextBilling: string;
  status: 'active' | 'paused' | 'cancelled';
  category: string;
}

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    frequency: 'monthly',
    nextBilling: '2026-02-01',
    status: 'active',
    category: 'Entertainment',
  },
  {
    id: '2',
    name: 'Spotify Premium',
    amount: 9.99,
    frequency: 'monthly',
    nextBilling: '2026-01-28',
    status: 'active',
    category: 'Entertainment',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    amount: 54.99,
    frequency: 'monthly',
    nextBilling: '2026-02-05',
    status: 'active',
    category: 'Software',
  },
  {
    id: '4',
    name: 'Amazon Prime',
    amount: 139.00,
    frequency: 'yearly',
    nextBilling: '2026-08-15',
    status: 'active',
    category: 'Shopping',
  },
  {
    id: '5',
    name: 'Gym Membership',
    amount: 45.00,
    frequency: 'monthly',
    nextBilling: '2026-02-01',
    status: 'paused',
    category: 'Health',
  },
];

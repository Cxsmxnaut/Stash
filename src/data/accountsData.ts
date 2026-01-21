export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  lastFour: string;
  institution: string;
}

export const accounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 5234.67,
    lastFour: '4532',
    institution: 'Chase Bank',
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 12450.00,
    lastFour: '8901',
    institution: 'Chase Bank',
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1523.45,
    lastFour: '3456',
    institution: 'American Express',
  },
];

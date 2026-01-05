export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution: string;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  accountId: string;
  type: 'income' | 'expense';
}

export const accounts: Account[] = [
  {
    id: 'acc1',
    name: 'Main Checking',
    type: 'checking',
    balance: 12450.75,
    institution: 'Chase Bank',
    color: '#3b82f6'
  },
  {
    id: 'acc2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 25800.00,
    institution: 'Marcus by Goldman Sachs',
    color: '#10b981'
  },
  {
    id: 'acc3',
    name: 'Travel Rewards Card',
    type: 'credit',
    balance: -2340.50,
    institution: 'American Express',
    color: '#ef4444'
  },
  {
    id: 'acc4',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 48920.25,
    institution: 'Vanguard',
    color: '#8b5cf6'
  }
];

export const transactions: Transaction[] = [
  // December 2025
  { id: 't1', date: '2025-12-28', description: 'Salary Deposit', amount: 5500.00, category: 'Income', accountId: 'acc1', type: 'income' },
  { id: 't2', date: '2025-12-27', description: 'Whole Foods', amount: -125.43, category: 'Groceries', accountId: 'acc3', type: 'expense' },
  { id: 't3', date: '2025-12-26', description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', accountId: 'acc1', type: 'expense' },
  { id: 't4', date: '2025-12-25', description: 'Amazon Purchase', amount: -89.99, category: 'Shopping', accountId: 'acc3', type: 'expense' },
  { id: 't5', date: '2025-12-24', description: 'Gas Station', amount: -62.50, category: 'Transportation', accountId: 'acc1', type: 'expense' },
  { id: 't6', date: '2025-12-23', description: 'Restaurant Dinner', amount: -145.00, category: 'Dining', accountId: 'acc3', type: 'expense' },
  { id: 't7', date: '2025-12-22', description: 'Electric Bill', amount: -135.20, category: 'Utilities', accountId: 'acc1', type: 'expense' },
  { id: 't8', date: '2025-12-20', description: 'Gym Membership', amount: -49.99, category: 'Health', accountId: 'acc1', type: 'expense' },
  { id: 't9', date: '2025-12-18', description: 'Coffee Shop', amount: -12.50, category: 'Dining', accountId: 'acc1', type: 'expense' },
  { id: 't10', date: '2025-12-17', description: 'Target', amount: -78.34, category: 'Shopping', accountId: 'acc3', type: 'expense' },
  { id: 't11', date: '2025-12-15', description: 'Freelance Project', amount: 1200.00, category: 'Income', accountId: 'acc1', type: 'income' },
  { id: 't12', date: '2025-12-15', description: 'Rent Payment', amount: -1850.00, category: 'Housing', accountId: 'acc1', type: 'expense' },
  { id: 't13', date: '2025-12-14', description: 'Spotify Premium', amount: -10.99, category: 'Entertainment', accountId: 'acc1', type: 'expense' },
  { id: 't14', date: '2025-12-12', description: 'Trader Joes', amount: -94.22, category: 'Groceries', accountId: 'acc3', type: 'expense' },
  { id: 't15', date: '2025-12-10', description: 'Car Insurance', amount: -165.00, category: 'Insurance', accountId: 'acc1', type: 'expense' },
  { id: 't16', date: '2025-12-08', description: 'Pharmacy', amount: -45.30, category: 'Health', accountId: 'acc3', type: 'expense' },
  { id: 't17', date: '2025-12-07', description: 'Movie Tickets', amount: -32.00, category: 'Entertainment', accountId: 'acc1', type: 'expense' },
  { id: 't18', date: '2025-12-05', description: 'Uber Rides', amount: -38.45, category: 'Transportation', accountId: 'acc3', type: 'expense' },
  { id: 't19', date: '2025-12-03', description: 'Internet Bill', amount: -79.99, category: 'Utilities', accountId: 'acc1', type: 'expense' },
  { id: 't20', date: '2025-12-01', description: 'Starbucks', amount: -18.75, category: 'Dining', accountId: 'acc1', type: 'expense' },

  // November 2025
  { id: 't21', date: '2025-11-28', description: 'Salary Deposit', amount: 5500.00, category: 'Income', accountId: 'acc1', type: 'income' },
  { id: 't22', date: '2025-11-25', description: 'Thanksgiving Groceries', amount: -234.56, category: 'Groceries', accountId: 'acc3', type: 'expense' },
  { id: 't23', date: '2025-11-22', description: 'Gas Station', amount: -55.00, category: 'Transportation', accountId: 'acc1', type: 'expense' },
  { id: 't24', date: '2025-11-20', description: 'Amazon Prime', amount: -14.99, category: 'Shopping', accountId: 'acc1', type: 'expense' },
  { id: 't25', date: '2025-11-18', description: 'Restaurant', amount: -98.50, category: 'Dining', accountId: 'acc3', type: 'expense' },
  { id: 't26', date: '2025-11-15', description: 'Rent Payment', amount: -1850.00, category: 'Housing', accountId: 'acc1', type: 'expense' },
  { id: 't27', date: '2025-11-12', description: 'Grocery Store', amount: -156.78, category: 'Groceries', accountId: 'acc3', type: 'expense' },
  { id: 't28', date: '2025-11-10', description: 'Electric Bill', amount: -128.40, category: 'Utilities', accountId: 'acc1', type: 'expense' },
  { id: 't29', date: '2025-11-08', description: 'Gym Membership', amount: -49.99, category: 'Health', accountId: 'acc1', type: 'expense' },
  { id: 't30', date: '2025-11-05', description: 'Coffee Shop', amount: -15.25, category: 'Dining', accountId: 'acc1', type: 'expense' },

  // October 2025
  { id: 't31', date: '2025-10-28', description: 'Salary Deposit', amount: 5500.00, category: 'Income', accountId: 'acc1', type: 'income' },
  { id: 't32', date: '2025-10-25', description: 'Halloween Decorations', amount: -67.89, category: 'Shopping', accountId: 'acc3', type: 'expense' },
  { id: 't33', date: '2025-10-22', description: 'Gas Station', amount: -58.30, category: 'Transportation', accountId: 'acc1', type: 'expense' },
  { id: 't34', date: '2025-10-20', description: 'Dinner Out', amount: -112.45, category: 'Dining', accountId: 'acc3', type: 'expense' },
  { id: 't35', date: '2025-10-18', description: 'Grocery Store', amount: -143.22, category: 'Groceries', accountId: 'acc3', type: 'expense' },
  { id: 't36', date: '2025-10-15', description: 'Rent Payment', amount: -1850.00, category: 'Housing', accountId: 'acc1', type: 'expense' },
  { id: 't37', date: '2025-10-15', description: 'Freelance Project', amount: 800.00, category: 'Income', accountId: 'acc1', type: 'income' },
  { id: 't38', date: '2025-10-12', description: 'Phone Bill', amount: -85.00, category: 'Utilities', accountId: 'acc1', type: 'expense' },
  { id: 't39', date: '2025-10-10', description: 'Car Insurance', amount: -165.00, category: 'Insurance', accountId: 'acc1', type: 'expense' },
  { id: 't40', date: '2025-10-08', description: 'Gym Membership', amount: -49.99, category: 'Health', accountId: 'acc1', type: 'expense' },
];

// Calculate category totals for current month
export const getCategoryTotals = (month: number, year: number) => {
  const categoryMap = new Map<string, number>();

  transactions
    .filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year && t.type === 'expense';
    })
    .forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + Math.abs(t.amount));
    });

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

// Calculate monthly cash flow
export const getMonthlyCashFlow = () => {
  const monthlyMap = new Map<string, { income: number; expenses: number }>();

  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { income: 0, expenses: 0 });
    }

    const data = monthlyMap.get(monthKey)!;
    if (t.type === 'income') {
      data.income += t.amount;
    } else {
      data.expenses += Math.abs(t.amount);
    }
  });

  return Array.from(monthlyMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

// Calculate net worth over time
export const getNetWorthHistory = () => {
  return [
    { month: '2025-08', netWorth: 81250 },
    { month: '2025-09', netWorth: 82840 },
    { month: '2025-10', netWorth: 83650 },
    { month: '2025-11', netWorth: 84230 },
    { month: '2025-12', netWorth: 84830.50 },
  ];
};

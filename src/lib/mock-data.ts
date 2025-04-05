
import { User, Group, Expense, Balance } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'You',
    phone: '+91 9876543210',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: 'u2',
    name: 'Rahul',
    phone: '+91 9876543211',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: 'u3',
    name: 'Priya',
    phone: '+91 9876543212',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: 'u4',
    name: 'Amit',
    phone: '+91 9876543213',
    avatarUrl: '/placeholder.svg',
  },
  {
    id: 'u5',
    name: 'Neha',
    phone: '+91 9876543214',
    avatarUrl: '/placeholder.svg',
  }
];

// Mock groups data
export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Goa Trip',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: '2025-03-15T12:00:00',
    emoji: '🏖️'
  },
  {
    id: 'g2',
    name: 'Flatmates',
    members: [mockUsers[0], mockUsers[3], mockUsers[4]],
    createdAt: '2025-01-01T12:00:00',
    emoji: '🏠'
  },
  {
    id: 'g3',
    name: 'Office Lunch',
    members: [mockUsers[0], mockUsers[1], mockUsers[3]],
    createdAt: '2025-04-01T12:00:00',
    emoji: '🍱'
  }
];

// Mock expenses data
export const mockExpenses: Expense[] = [
  {
    id: 'e1',
    title: 'Beach Resort Booking',
    amount: 15000,
    paidBy: 'u1',
    groupId: 'g1',
    participants: [
      { userId: 'u1', amount: 5000 },
      { userId: 'u2', amount: 5000 },
      { userId: 'u3', amount: 5000 }
    ],
    date: '2025-03-20T14:30:00',
    category: 'Travel',
    notes: 'Beachside resort for 2 nights',
    splitMethod: 'equal'
  },
  {
    id: 'e2',
    title: 'Dinner at Titos',
    amount: 4500,
    paidBy: 'u2',
    groupId: 'g1',
    participants: [
      { userId: 'u1', amount: 1500 },
      { userId: 'u2', amount: 1500 },
      { userId: 'u3', amount: 1500 }
    ],
    date: '2025-03-21T20:15:00',
    category: 'Food',
    splitMethod: 'equal'
  },
  {
    id: 'e3',
    title: 'Monthly Rent',
    amount: 30000,
    paidBy: 'u4',
    groupId: 'g2',
    participants: [
      { userId: 'u1', amount: 10000 },
      { userId: 'u3', amount: 10000 },
      { userId: 'u4', amount: 10000 }
    ],
    date: '2025-04-01T09:00:00',
    category: 'Rent',
    splitMethod: 'equal'
  },
  {
    id: 'e4',
    title: 'Electricity Bill',
    amount: 3600,
    paidBy: 'u1',
    groupId: 'g2',
    participants: [
      { userId: 'u1', amount: 1200 },
      { userId: 'u3', amount: 1200 },
      { userId: 'u4', amount: 1200 }
    ],
    date: '2025-04-02T14:00:00',
    category: 'Bills',
    splitMethod: 'equal'
  },
  {
    id: 'e5',
    title: 'Team Lunch',
    amount: 3600,
    paidBy: 'u3',
    groupId: 'g3',
    participants: [
      { userId: 'u1', amount: 1200 },
      { userId: 'u2', amount: 1200 },
      { userId: 'u3', amount: 1200 }
    ],
    date: '2025-04-03T13:30:00',
    category: 'Food',
    splitMethod: 'equal'
  },
  {
    id: 'e6',
    title: 'Movie Tickets',
    amount: 1200,
    paidBy: 'u1',
    participants: [
      { userId: 'u1', amount: 600 },
      { userId: 'u2', amount: 600 }
    ],
    date: '2025-04-04T18:45:00',
    category: 'Entertainment',
    splitMethod: 'equal'
  }
];

// Calculate balances
export const calculateBalances = (): { [userId: string]: Balance[] } => {
  const balances: { [userId: string]: { [otherUserId: string]: number } } = {};
  
  // Initialize balances for all users
  mockUsers.forEach(user => {
    balances[user.id] = {};
    mockUsers.forEach(otherUser => {
      if (user.id !== otherUser.id) {
        balances[user.id][otherUser.id] = 0;
      }
    });
  });
  
  // Process all expenses
  mockExpenses.forEach(expense => {
    const paidBy = expense.paidBy;
    
    // For each participant, update the balance
    expense.participants.forEach(participant => {
      if (participant.userId !== paidBy) {
        // The participant owes money to the payer
        balances[paidBy][participant.userId] += participant.amount;
        balances[participant.userId][paidBy] -= participant.amount;
      }
    });
  });
  
  // Convert to array format
  const balanceArrays: { [userId: string]: Balance[] } = {};
  
  Object.entries(balances).forEach(([userId, userBalances]) => {
    balanceArrays[userId] = Object.entries(userBalances)
      .filter(([_, amount]) => amount !== 0)
      .map(([otherUserId, amount]) => ({
        userId: otherUserId,
        amount
      }));
  });
  
  return balanceArrays;
};

// Helper function to get a user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get a group by ID
export const getGroupById = (id: string): Group | undefined => {
  return mockGroups.find(group => group.id === id);
};

// Helper function to get expenses by group ID
export const getExpensesByGroupId = (groupId: string): Expense[] => {
  return mockExpenses.filter(expense => expense.groupId === groupId);
};

// Helper function to get expenses for a specific user
export const getExpensesByUserId = (userId: string): Expense[] => {
  return mockExpenses.filter(expense => 
    expense.paidBy === userId || expense.participants.some(p => p.userId === userId)
  );
};

// Helper function to get total balance for a user
export const getTotalBalanceForUser = (userId: string): number => {
  const userBalances = calculateBalances()[userId] || [];
  return userBalances.reduce((total, balance) => total + balance.amount, 0);
};

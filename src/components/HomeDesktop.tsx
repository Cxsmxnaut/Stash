import { Edit2, ShoppingBag, ShoppingCart, Coffee, MoreHorizontal } from 'lucide-react';
import { Card } from './Card';
import { ExpenseChart } from './ExpenseChart';
import { useAuth } from '../contexts/AuthContext';
import { categoryData, totalBalance, totalSpent, transactions } from '../data/mockData';

export function HomeDesktop() {
  const { user } = useAuth();
  
  const categoryIcons = {
    shopping: ShoppingBag,
    groceries: ShoppingCart,
    food: Coffee,
    other: MoreHorizontal,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">
          Hi, {user?.name || 'there'} 👋
        </h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Welcome back to your financial dashboard</p>
      </div>

      {/* Top Row - Balance and Chart */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Balance Card */}
        <Card className="col-span-1">
          <div className="flex items-start justify-between mb-2">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Total Balance</p>
            <button className="text-[#8E8E93] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors" aria-label="Edit">
              <Edit2 size={18} />
            </button>
          </div>
          <p className="text-[40px] font-semibold text-[#111111] dark:text-white mb-6">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] dark:text-[#A0A0A0]">Monthly Spending</span>
              <span className="text-[#111111] dark:text-white font-medium">
                ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] dark:text-[#A0A0A0]">Transactions</span>
              <span className="text-[#111111] dark:text-white font-medium">{transactions.length}</span>
            </div>
          </div>
        </Card>

        {/* Chart Card */}
        <Card className="col-span-2">
          <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">Spending Overview</h2>
          <ExpenseChart data={categoryData} total={totalSpent} />
        </Card>
      </div>

      {/* Bottom Row - Categories and Recent Transactions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">Categories</h2>
          <div className="space-y-4">
            {categoryData.map((category) => {
              const Icon = categoryIcons[category.type];
              return (
                <div key={category.type} className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: category.color + '30' }}
                  >
                    <Icon size={24} style={{ color: category.color }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#111111] dark:text-white font-medium">{category.name}</p>
                    <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{category.percentage}% of spending</p>
                  </div>
                  <p className="text-[#111111] dark:text-white font-semibold">
                    ${category.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">Recent Transactions</h2>
          <div className="space-y-1">
            {recentTransactions.map((transaction) => {
              const Icon = categoryIcons[transaction.category];
              const color = categoryData.find(c => c.type === transaction.category)?.color || '#8E8E93';
              
              return (
                <div 
                  key={transaction.id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color + '30' }}
                  >
                    <Icon size={20} style={{ color }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#111111] dark:text-white font-medium">{transaction.merchant}</p>
                    <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{formatDate(transaction.date)}</p>
                  </div>
                  <p className="text-[#111111] dark:text-white font-semibold">
                    ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
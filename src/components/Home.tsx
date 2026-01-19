import { Edit2, ShoppingBag, ShoppingCart, Coffee, MoreHorizontal } from 'lucide-react';
import { Card } from './Card';
import { ExpenseChart } from './ExpenseChart';
import { ThemeToggle } from './ThemeToggle';
import { categoryData, totalBalance, totalSpent } from '../data/mockData';

export function Home() {
  const categoryIcons = {
    shopping: ShoppingBag,
    groceries: ShoppingCart,
    food: Coffee,
    other: MoreHorizontal,
  };

  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[#111111] dark:text-white">Hi, Wayne 👋</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Welcome back</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Balance Card */}
      <Card className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Total Balance</p>
          <button className="text-[#8E8E93] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors" aria-label="Edit">
            <Edit2 size={18} />
          </button>
        </div>
        <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </Card>

      {/* Expense Chart */}
      <Card className="mb-6">
        <h2 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Spending Overview</h2>
        <ExpenseChart data={categoryData} total={totalSpent} />
      </Card>

      {/* Category Breakdown */}
      <Card>
        <h2 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Categories</h2>
        <div className="space-y-4">
          {categoryData.map((category) => {
            const Icon = categoryIcons[category.type];
            return (
              <div key={category.type} className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: category.color + '30' }}
                >
                  <Icon size={20} style={{ color: category.color }} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
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
    </div>
  );
}
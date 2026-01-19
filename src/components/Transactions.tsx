import { ShoppingBag, ShoppingCart, Coffee, MoreHorizontal, SlidersHorizontal } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { transactions, categoryColors } from '../data/mockData';
import { useState } from 'react';
import { SearchFilters } from './SearchFilters';

export function Transactions() {
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryIcons = {
    shopping: ShoppingBag,
    groceries: ShoppingCart,
    food: Coffee,
    other: MoreHorizontal,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = formatDate(transaction.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <>
      <div className="px-5 pt-12 pb-24">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-1">Transactions</h1>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{transactions.length} total transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(true)}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1E1E1E] flex items-center justify-center hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
              aria-label="Filter transactions"
            >
              <SlidersHorizontal size={20} className="text-[#111111] dark:text-white" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Transaction Groups */}
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, txns]) => (
            <div key={date}>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-3 px-1">{date}</p>
              <Card className="!p-0 overflow-hidden">
                {txns.map((transaction, index) => {
                  const Icon = categoryIcons[transaction.category];
                  const color = categoryColors[transaction.category];
                  const isLast = index === txns.length - 1;
                  
                  return (
                    <div 
                      key={transaction.id}
                      className={`flex items-center gap-3 p-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer ${
                        !isLast ? 'border-b border-[#F7F7F7] dark:border-[#2A2A2A]' : ''
                      }`}
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
                      <p className="text-[#111111] dark:text-white font-semibold text-right">
                        ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      </div>

      {showFilters && <SearchFilters onClose={() => setShowFilters(false)} />}
    </>
  );
}
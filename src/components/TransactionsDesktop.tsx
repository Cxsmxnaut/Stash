import { ShoppingBag, ShoppingCart, Coffee, MoreHorizontal, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Card } from './Card';
import { transactions, categoryColors } from '../data/mockData';
import { useState } from 'react';
import { SearchFilters } from './SearchFilters';

export function TransactionsDesktop() {
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
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Transactions</h1>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{transactions.length} total transactions</p>
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#1E1E1E] hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
          >
            <SlidersHorizontal size={20} className="text-[#111111] dark:text-white" />
            <span className="text-[#111111] dark:text-white font-medium">Filter</span>
          </button>
        </div>

        {/* Transaction Table */}
        <Card className="!p-0 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F7F7F7] dark:bg-[#2A2A2A] border-b border-[#E5E5E5] dark:border-[#3A3A3A]">
            <div className="col-span-5 flex items-center gap-2 text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium">
              <span>Merchant</span>
              <ChevronDown size={16} />
            </div>
            <div className="col-span-3 flex items-center gap-2 text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium">
              <span>Category</span>
              <ChevronDown size={16} />
            </div>
            <div className="col-span-2 flex items-center gap-2 text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium">
              <span>Date</span>
              <ChevronDown size={16} />
            </div>
            <div className="col-span-2 text-right text-[#8E8E93] dark:text-[#A0A0A0] text-sm font-medium">
              Amount
            </div>
          </div>

          {/* Transaction Groups */}
          <div className="divide-y divide-[#F7F7F7] dark:divide-[#2A2A2A]">
            {Object.entries(groupedTransactions).map(([date, txns]) => (
              <div key={date}>
                {txns.map((transaction) => {
                  const Icon = categoryIcons[transaction.category];
                  const color = categoryColors[transaction.category];
                  
                  return (
                    <div 
                      key={transaction.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                    >
                      {/* Merchant */}
                      <div className="col-span-5 flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: color + '30' }}
                        >
                          <Icon size={20} style={{ color }} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#111111] dark:text-white font-medium">{transaction.merchant}</p>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="col-span-3 flex items-center">
                        <span 
                          className="px-3 py-1.5 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: color + '30',
                            color: color
                          }}
                        >
                          {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="col-span-2 flex items-center">
                        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{formatDate(transaction.date)}</p>
                      </div>

                      {/* Amount */}
                      <div className="col-span-2 flex items-center justify-end">
                        <p className="text-[#111111] dark:text-white font-semibold">
                          ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <Card className="text-center">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Total Transactions</p>
            <p className="text-[28px] font-semibold text-[#111111] dark:text-white">{transactions.length}</p>
          </Card>
          <Card className="text-center">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Total Spent</p>
            <p className="text-[28px] font-semibold text-[#111111] dark:text-white">
              ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Average Transaction</p>
            <p className="text-[28px] font-semibold text-[#111111] dark:text-white">
              ${(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)}
            </p>
          </Card>
          <Card className="text-center">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">This Month</p>
            <p className="text-[28px] font-semibold text-[#111111] dark:text-white">
              ${transactions.filter(t => {
                const date = new Date(t.date);
                const now = new Date();
                return date.getMonth() === now.getMonth();
              }).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </Card>
        </div>
      </div>

      {showFilters && <SearchFilters onClose={() => setShowFilters(false)} />}
    </>
  );
}

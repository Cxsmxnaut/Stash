import { X } from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';

interface SearchFiltersProps {
  onClose: () => void;
}

export function SearchFilters({ onClose }: SearchFiltersProps) {
  const [category, setCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [amountMin, setAmountMin] = useState(0);
  const [amountMax, setAmountMax] = useState(500);

  const handleClearAll = () => {
    setCategory('all');
    setDateRange('all');
    setAmountMin(0);
    setAmountMax(500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Bottom Sheet */}
      <div 
        className="relative bg-white dark:bg-[#1E1E1E] rounded-t-[32px] w-full p-6 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}
      >
        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full mx-auto mb-6" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-semibold text-[#111111] dark:text-white">Filters</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#333333] transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[#111111] dark:text-white" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="space-y-6 mb-6">
          {/* Category */}
          <div>
            <label className="block text-[#111111] dark:text-white font-medium mb-3">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white"
            >
              <option value="all">All Categories</option>
              <option value="shopping">Shopping</option>
              <option value="groceries">Groceries</option>
              <option value="food">Food & Dining</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-[#111111] dark:text-white font-medium mb-3">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] border-none text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-[#111111] dark:text-white font-medium mb-3">
              Amount Range: ${amountMin} - ${amountMax}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="500"
                value={amountMin}
                onChange={(e) => setAmountMin(Number(e.target.value))}
                className="w-full h-2 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-full appearance-none cursor-pointer accent-[#111111] dark:accent-white"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={amountMax}
                onChange={(e) => setAmountMax(Number(e.target.value))}
                className="w-full h-2 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-full appearance-none cursor-pointer accent-[#111111] dark:accent-white"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleClearAll} className="flex-1">
            Clear All
          </Button>
          <Button onClick={onClose} className="flex-1">
            Show Results
          </Button>
        </div>
      </div>
    </div>
  );
}
import { TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { categoryData, totalSpent } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Analytics() {
  // Mock chart data for the past week
  const chartData = [
    { day: 'Mon', amount: 145 },
    { day: 'Tue', amount: 287 },
    { day: 'Wed', amount: 198 },
    { day: 'Thu', amount: 342 },
    { day: 'Fri', amount: 156 },
    { day: 'Sat', amount: 89 },
    { day: 'Sun', amount: 44 },
  ];

  // Find biggest expense category
  const biggestCategory = categoryData.reduce((prev, current) => 
    prev.amount > current.amount ? prev : current
  );

  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">Analytics</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Your spending insights</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Key Insight */}
      <Card className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/20 flex items-center justify-center">
            <TrendingUp size={24} className="text-[#FFD166]" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] font-semibold text-[#111111] dark:text-white mb-1">
              Your biggest expense was {biggestCategory.name}
            </h2>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0]">
              ${biggestCategory.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month
            </p>
          </div>
        </div>

        {/* Mini Chart */}
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={biggestCategory.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={biggestCategory.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke={biggestCategory.color}
              strokeWidth={2.5}
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <h2 className="text-[18px] font-medium text-[#111111] dark:text-white mb-4">Breakdown by Category</h2>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={category.type}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <p className="text-[#111111] dark:text-white font-medium">{category.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#111111] dark:text-white font-semibold">
                    ${category.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{category.percentage}%</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: category.color, 
                    width: `${category.percentage}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t border-[#F7F7F7] dark:border-[#2A2A2A]">
          <div className="flex items-center justify-between">
            <p className="text-[#111111] dark:text-white font-semibold">Total Spending</p>
            <p className="text-[24px] font-semibold text-[#111111] dark:text-white">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
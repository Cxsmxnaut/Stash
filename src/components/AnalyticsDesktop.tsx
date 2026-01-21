import { TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { categoryData, totalSpent } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function AnalyticsDesktop() {
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

  // Monthly comparison data
  const monthlyData = [
    { month: 'Aug', amount: 1456 },
    { month: 'Sep', amount: 1789 },
    { month: 'Oct', amount: 1234 },
    { month: 'Nov', amount: 1678 },
    { month: 'Dec', amount: 1923 },
    { month: 'Jan', amount: 1261 },
  ];

  // Find biggest expense category
  const biggestCategory = categoryData.reduce((prev, current) => 
    prev.amount > current.amount ? prev : current
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Analytics</h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">Deep insights into your spending patterns</p>
      </div>

      {/* Top Row - Key Insight */}
      <Card className="mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-3xl bg-[#FFD166]/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={36} className="text-[#FFD166]" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">
              Your biggest expense was {biggestCategory.name}
            </h2>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-lg mb-6">
              ${biggestCategory.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} this month • {biggestCategory.percentage}% of total spending
            </p>

            {/* Weekly Trend Chart */}
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={biggestCategory.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={biggestCategory.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7F7F7" />
                <XAxis 
                  dataKey="day" 
                  stroke="#8E8E93"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#8E8E93"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke={biggestCategory.color}
                  strokeWidth={3}
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Bottom Row - Category Breakdown and Monthly Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">Breakdown by Category</h2>
          <div className="space-y-5">
            {categoryData.map((category) => (
              <div key={category.type}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
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
                <div className="w-full h-3 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
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
          <div className="mt-8 pt-6 border-t border-[#F7F7F7] dark:border-[#2A2A2A]">
            <div className="flex items-center justify-between">
              <p className="text-[#111111] dark:text-white font-semibold text-lg">Total Spending</p>
              <p className="text-[28px] font-semibold text-[#111111] dark:text-white">
                ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>

        {/* Monthly Comparison */}
        <Card>
          <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">6-Month Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F7F7F7" />
              <XAxis 
                dataKey="month" 
                stroke="#8E8E93"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#8E8E93"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#111111"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-1">Average</p>
              <p className="text-[#111111] dark:text-white font-semibold text-lg">
                ${(monthlyData.reduce((sum, m) => sum + m.amount, 0) / monthlyData.length).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-1">Highest</p>
              <p className="text-[#111111] dark:text-white font-semibold text-lg">
                ${Math.max(...monthlyData.map(m => m.amount)).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mb-1">Lowest</p>
              <p className="text-[#111111] dark:text-white font-semibold text-lg">
                ${Math.min(...monthlyData.map(m => m.amount)).toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

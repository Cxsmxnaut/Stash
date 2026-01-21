import { Play, Pause, X, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { EmptyState } from './EmptyState';
import { subscriptions } from '../data/subscriptionsData';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SubscriptionsDesktop() {
  const [subs, setSubs] = useState(subscriptions);

  const activeSubscriptions = subs.filter(s => s.status === 'active');
  const totalMonthly = activeSubscriptions.reduce((sum, sub) => {
    return sum + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12);
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleTogglePause = (id: string) => {
    setSubs(subs.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: sub.status === 'active' ? 'paused' : 'active' };
      }
      return sub;
    }));
  };

  const handleCancel = (id: string) => {
    setSubs(subs.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: 'cancelled' };
      }
      return sub;
    }));
  };

  // Group by category for chart
  const categoryTotals = activeSubscriptions.reduce((acc, sub) => {
    const monthlyAmount = sub.frequency === 'monthly' ? sub.amount : sub.amount / 12;
    acc[sub.category] = (acc[sub.category] || 0) + monthlyAmount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount: Number(amount.toFixed(2)),
  }));

  const activeSubs = subs.filter(s => s.status === 'active' || s.status === 'paused');

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold text-[#111111] dark:text-white mb-2">Subscriptions</h1>
        <p className="text-[#8E8E93] dark:text-[#A0A0A0]">
          {activeSubscriptions.length} active subscriptions
        </p>
      </div>

      {activeSubs.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No subscriptions"
          description="Add your recurring payments to track and manage them in one place."
          action={{
            label: 'Add Subscription',
            onClick: () => {},
          }}
        />
      ) : (
        <>
          {/* Summary Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Monthly Total</p>
              <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
                ${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </Card>

            <Card>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Yearly Total</p>
              <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
                ${(totalMonthly * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </Card>

            <Card>
              <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Active</p>
              <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
                {activeSubscriptions.length}
              </p>
            </Card>
          </div>

          {/* Category Breakdown Chart */}
          {chartData.length > 0 && (
            <Card className="mb-6">
              <h2 className="text-[20px] font-medium text-[#111111] dark:text-white mb-6">Spending by Category</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F7F7F7" />
                  <XAxis 
                    dataKey="category" 
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
            </Card>
          )}

          {/* Subscriptions Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {activeSubs.map((sub) => {
              const daysUntil = getDaysUntil(sub.nextBilling);
              const isPaused = sub.status === 'paused';

              return (
                <Card key={sub.id} className={isPaused ? 'opacity-60' : ''}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[20px] font-semibold text-[#111111] dark:text-white">{sub.name}</h3>
                        {isPaused && (
                          <span className="px-2 py-1 bg-[#FFD166]/20 text-[#FFD166] text-xs font-medium rounded-full">
                            Paused
                          </span>
                        )}
                      </div>
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{sub.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[28px] font-semibold text-[#111111] dark:text-white">
                        ${sub.amount.toFixed(2)}
                      </p>
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0]">/{sub.frequency === 'monthly' ? 'month' : 'year'}</p>
                    </div>
                  </div>

                  {!isPaused && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-2xl">
                      <Calendar size={18} className="text-[#8E8E93] dark:text-[#A0A0A0]" />
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0] flex-1">
                        Next billing: {formatDate(sub.nextBilling)}
                      </p>
                      <span className="text-[#111111] dark:text-white font-medium">
                        {daysUntil} days
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePause(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#111111] dark:text-white rounded-2xl hover:bg-[#EEEEEE] dark:hover:bg-[#333333] transition-colors"
                    >
                      {isPaused ? (
                        <>
                          <Play size={18} strokeWidth={2.5} />
                          <span className="font-medium">Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause size={18} strokeWidth={2.5} />
                          <span className="font-medium">Pause</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleCancel(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-colors"
                    >
                      <X size={18} strokeWidth={2.5} />
                      <span className="font-medium">Cancel</span>
                    </button>
                  </div>
                </Card>
              );
            })}

            {/* Add Subscription Card */}
            <Card className="border-2 border-dashed border-[#8E8E93] dark:border-[#A0A0A0] bg-transparent hover:border-[#111111] hover:bg-[#F7F7F7] dark:hover:border-white dark:hover:bg-[#2A2A2A] transition-all cursor-pointer">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center mb-4">
                  <Plus size={28} className="text-[#8E8E93] dark:text-[#A0A0A0]" strokeWidth={2.5} />
                </div>
                <p className="text-[#8E8E93] dark:text-[#A0A0A0] font-medium">Add Subscription</p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

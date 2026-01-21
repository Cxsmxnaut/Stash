import { Play, Pause, X, Plus, Calendar } from 'lucide-react';
import { Card } from './Card';
import { ThemeToggle } from './ThemeToggle';
import { EmptyState } from './EmptyState';
import { subscriptions } from '../data/subscriptionsData';
import { useState } from 'react';

export function Subscriptions() {
  const [subs, setSubs] = useState(subscriptions);

  const activeSubscriptions = subs.filter(s => s.status === 'active');
  const totalMonthly = activeSubscriptions.reduce((sum, sub) => {
    return sum + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12);
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

  const activeSubs = subs.filter(s => s.status === 'active' || s.status === 'paused');

  return (
    <div className="px-5 pt-12 pb-24">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] dark:text-white mb-2">Subscriptions</h1>
          <p className="text-[#8E8E93] dark:text-[#A0A0A0]">{activeSubscriptions.length} active</p>
        </div>
        <ThemeToggle />
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
          {/* Monthly Total */}
          <Card className="mb-6">
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] mb-2">Monthly Total</p>
            <p className="text-[32px] font-semibold text-[#111111] dark:text-white">
              ${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm mt-2">
              ${(totalMonthly * 12).toLocaleString('en-US', { minimumFractionDigits: 2 })} per year
            </p>
          </Card>

          {/* Subscriptions List */}
          <div className="space-y-4 mb-6">
            {activeSubs.map((sub) => {
              const daysUntil = getDaysUntil(sub.nextBilling);
              const isPaused = sub.status === 'paused';

              return (
                <Card key={sub.id} className={isPaused ? 'opacity-60' : ''}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#111111] dark:text-white font-medium">{sub.name}</h3>
                        {isPaused && (
                          <span className="px-2 py-0.5 bg-[#FFD166]/20 text-[#FFD166] text-xs font-medium rounded-full">
                            Paused
                          </span>
                        )}
                      </div>
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">{sub.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[20px] font-semibold text-[#111111] dark:text-white">
                        ${sub.amount.toFixed(2)}
                      </p>
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm">/{sub.frequency === 'monthly' ? 'mo' : 'yr'}</p>
                    </div>
                  </div>

                  {!isPaused && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-[#F7F7F7] dark:bg-[#2A2A2A] rounded-2xl">
                      <Calendar size={16} className="text-[#8E8E93] dark:text-[#A0A0A0]" />
                      <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-sm flex-1">
                        Next billing: {formatDate(sub.nextBilling)} ({daysUntil} days)
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTogglePause(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#111111] dark:text-white rounded-2xl hover:bg-[#EEEEEE] dark:hover:bg-[#333333] transition-colors"
                    >
                      {isPaused ? (
                        <>
                          <Play size={16} strokeWidth={2.5} />
                          <span className="text-sm font-medium">Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause size={16} strokeWidth={2.5} />
                          <span className="text-sm font-medium">Pause</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleCancel(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-colors"
                    >
                      <X size={16} strokeWidth={2.5} />
                      <span className="text-sm font-medium">Cancel</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Add Subscription Button */}
          <button
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-[#8E8E93] dark:border-[#A0A0A0] text-[#8E8E93] dark:text-[#A0A0A0] hover:border-[#111111] hover:text-[#111111] dark:hover:border-white dark:hover:text-white transition-colors"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span className="font-medium">Add Subscription</span>
          </button>
        </>
      )}
    </div>
  );
}

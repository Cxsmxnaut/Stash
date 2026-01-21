import { Home, Search, Plus, BarChart3, Settings as SettingsIcon, Wallet, Calendar } from 'lucide-react';

export type Screen = 'home' | 'accounts' | 'transactions' | 'analytics' | 'subscriptions' | 'settings' | 'transaction-detail';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onAddClick: () => void;
}

export function BottomNav({ currentScreen, onNavigate, onAddClick }: BottomNavProps) {
  const navItems: { id: Screen; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'accounts', icon: Wallet, label: 'Accounts' },
    { id: 'transactions', icon: Search, label: 'Transactions' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'subscriptions', icon: Calendar, label: 'Subscriptions' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-[#F7F7F7] dark:border-[#2A2A2A] pb-safe transition-colors">
        <div className="flex items-center justify-around px-5 py-3">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-1 min-w-0"
              >
                <Icon 
                  size={24} 
                  className={isActive ? 'text-[#111111] dark:text-white' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span 
                  className={`text-[10px] ${isActive ? 'text-[#111111] dark:text-white font-medium' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Spacer for floating button */}
          <div className="w-16" />

          {navItems.slice(2, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-1 min-w-0"
              >
                <Icon 
                  size={24} 
                  className={isActive ? 'text-[#111111] dark:text-white' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span 
                  className={`text-[10px] ${isActive ? 'text-[#111111] dark:text-white font-medium' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Add Button */}
      <button
        onClick={onAddClick}
        className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-14 h-14 bg-[#111111] dark:bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
        aria-label="Add Transaction"
      >
        <Plus size={28} className="text-white dark:text-[#111111]" strokeWidth={2.5} />
      </button>
    </>
  );
}
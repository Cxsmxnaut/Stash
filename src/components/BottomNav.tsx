import { Home, Search, Plus, BarChart3, User } from 'lucide-react';

type Screen = 'home' | 'search' | 'analytics' | 'profile';

interface BottomNavProps {
  currentScreen: Screen | string;
  onNavigate: (screen: Screen) => void;
  onAddClick: () => void;
}

export function BottomNav({ currentScreen, onNavigate, onAddClick }: BottomNavProps) {
  const navItems: { id: Screen; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E1E1E] border-t border-[#F7F7F7] dark:border-[#2A2A2A] safe-area-inset-bottom transition-colors">
      <div className="flex items-center justify-around px-4 py-2">
        {/* First two items */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 flex-1 min-w-[60px]"
              aria-label={item.label}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
                className={isActive ? 'text-[#111111] dark:text-white' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}
              />
            </button>
          );
        })}

        {/* Center Add Button */}
        <button
          onClick={onAddClick}
          className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] p-4 rounded-full transform -translate-y-2 hover:scale-105 transition-all mx-2"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          aria-label="Add transaction"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        {/* Last two items */}
        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 py-2 flex-1 min-w-[60px]"
              aria-label={item.label}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
                className={isActive ? 'text-[#111111] dark:text-white' : 'text-[#8E8E93] dark:text-[#A0A0A0]'}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
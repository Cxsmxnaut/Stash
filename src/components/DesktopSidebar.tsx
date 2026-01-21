import { Home, Search, BarChart3, User, Plus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export type Screen = 'home' | 'search' | 'analytics' | 'profile' | 'receipt-detail';

interface DesktopSidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onAddClick: () => void;
}

export function DesktopSidebar({ currentScreen, onNavigate, onAddClick }: DesktopSidebarProps) {
  const { user } = useAuth();
  
  const navItems: { id: Screen; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'search', icon: Search, label: 'Transactions' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-[#1E1E1E] border-r border-[#F7F7F7] dark:border-[#2A2A2A] flex flex-col fixed left-0 top-0 transition-colors">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#F7F7F7] dark:border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold text-[#111111] dark:text-white">Finance</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]' 
                    : 'text-[#8E8E93] dark:text-[#A0A0A0] hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A]'
                }`}
              >
                <Icon 
                  size={20} 
                  strokeWidth={2.5}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-2xl hover:scale-[1.02] transition-transform"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          <span className="font-medium">Add Transaction</span>
        </button>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-[#F7F7F7] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-white flex items-center justify-center">
            <span className="text-white dark:text-[#111111] font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-[#111111] dark:text-white font-medium text-sm">{user?.name || 'User'}</p>
            <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-xs truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
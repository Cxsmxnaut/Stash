import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-all"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-[#111111]" />
      ) : (
        <Sun size={18} className="text-white" />
      )}
    </button>
  );
}

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 transition-colors ${className}`}
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
    >
      {children}
    </div>
  );
}
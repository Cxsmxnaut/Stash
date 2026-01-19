import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = 'w-full py-4 rounded-2xl font-medium transition-all';
  
  const variantStyles = {
    primary: 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#222222] dark:hover:bg-[#E5E5E5]',
    secondary: 'bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#111111] dark:text-white hover:bg-[#EEEEEE] dark:hover:bg-[#333333]'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
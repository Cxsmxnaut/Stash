import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-5">
      <div className="w-20 h-20 rounded-3xl bg-[#F7F7F7] dark:bg-[#2A2A2A] flex items-center justify-center mb-6">
        <Icon size={32} className="text-[#8E8E93] dark:text-[#A0A0A0]" strokeWidth={2} />
      </div>
      <h3 className="text-[20px] font-semibold text-[#111111] dark:text-white mb-2 text-center">
        {title}
      </h3>
      <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-center mb-6 max-w-sm">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-2xl font-medium hover:scale-[1.02] transition-transform"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

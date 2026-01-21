import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-5">
      <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-6">
        <AlertCircle size={32} className="text-red-500" strokeWidth={2} />
      </div>
      <h3 className="text-[20px] font-semibold text-[#111111] dark:text-white mb-2 text-center">
        Something went wrong
      </h3>
      <p className="text-[#8E8E93] dark:text-[#A0A0A0] text-center mb-6 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-2xl font-medium hover:scale-[1.02] transition-transform"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

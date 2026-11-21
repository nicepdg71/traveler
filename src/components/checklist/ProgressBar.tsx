import React from 'react';

interface ProgressBarProps {
  total: number;
  completed: number;
  className?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  total,
  completed,
  className = '',
  showText = true,
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-700">
          <span>준비율 / 완료 현황</span>
          <span className="text-emerald-700 font-bold">
            {completed}/{total} ({percentage}%)
          </span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

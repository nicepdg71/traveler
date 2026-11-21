import React from 'react';
import { useApp } from '../../context/AppContext';

export const DaySelector: React.FC = () => {
  const { state, setCurrentDay } = useApp();

  const days = [
    { day: 1, label: 'Day 1', date: '11.21(목)', desc: '도쿄 입국' },
    { day: 2, label: 'Day 2', date: '11.22(금)', desc: '시내 투어', isToday: true },
    { day: 3, label: 'Day 3', date: '11.23(토)', desc: '오다이바 & 귀국' },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-slate-200/70 rounded-xl">
      {days.map((item) => {
        const isSelected = state.currentDay === item.day;
        return (
          <button
            key={item.day}
            onClick={() => setCurrentDay(item.day)}
            className={`flex-1 py-2 px-1.5 rounded-lg text-center transition-all ${
              isSelected
                ? 'bg-white text-brand-indigo font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs">{item.label}</span>
              {item.isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
              {item.date}
            </div>
          </button>
        );
      })}
    </div>
  );
};

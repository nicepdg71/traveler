import React from 'react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';
import { Calendar, CheckSquare, QrCode, PhoneCall } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { state, setActiveTab } = useApp();

  const navItems: { tab: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'ITINERARY', label: '일정', icon: Calendar },
    { tab: 'CHECKLIST', label: '체크리스트', icon: CheckSquare },
    { tab: 'VOUCHER', label: '바우처', icon: QrCode },
    { tab: 'SOS', label: '현지 SOS', icon: PhoneCall },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {navItems.map(({ tab, label, icon: Icon }) => {
          const isActive = state.activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive
                  ? 'text-brand-indigo font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-brand-indigo' : ''}`} />
              <span className="text-[11px] tracking-tight">{label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-brand-indigo rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

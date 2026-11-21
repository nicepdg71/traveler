import React from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, UserCheck, Users } from 'lucide-react';

export const Header: React.FC = () => {
  const { state, setUserRole, resetAllData } = useApp();

  const handleRoleToggle = () => {
    setUserRole(state.userRole === 'GUIDE' ? 'TRAVELER' : 'GUIDE');
  };

  const handleReset = () => {
    if (window.confirm('모든 데이터를 초기 목업 데이터(도쿄 2박 3일)로 복원하시겠습니까?')) {
      resetAllData();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-brand-blue">
              Day {state.currentDay} / 3
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                state.userRole === 'GUIDE'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {state.userRole === 'GUIDE' ? <UserCheck className="w-3 h-3" /> : <Users className="w-3 h-3" />}
              {state.userRole === 'GUIDE' ? '가이드 모드' : '여행객 모드'}
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
            도쿄 2박 3일 힐링 투어
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRoleToggle}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition text-xs font-medium flex items-center gap-1"
            title="모드 전환"
          >
            {state.userRole === 'GUIDE' ? '가이드' : '여행객'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition"
            title="초기 데이터 복원"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

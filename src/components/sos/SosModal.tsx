import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, X, PhoneCall, ShieldAlert, Phone, Siren, Building2, Headphones } from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { state } = useApp();
  const guide = state.emergencyContacts.find((c) => c.isDirectCall) || state.emergencyContacts[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 pb-20 sm:pb-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        {/* Header Bar */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 truncate">
                긴급 SOS (현지 긴급 연락망)
              </h2>
              <p className="text-[11px] text-slate-500 truncate">
                터치 시 즉시 전화 연결됩니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex flex-col gap-3">
          {/* 1. Guide Direct Call Card */}
          <div className="bg-slate-50 rounded-xl p-3.5 flex flex-col gap-3 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-brand-blue font-bold text-base shrink-0">
                가이드
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue font-semibold text-[10px]">
                    담당 가이드
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                    24시 상시연결
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 mt-1 truncate">
                  {guide.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{guide.phone}</p>
              </div>
            </div>

            <a
              href={`tel:${guide.phone}`}
              className="w-full min-h-[46px] rounded-xl bg-brand-indigo hover:bg-blue-900 text-white px-3 py-2 flex items-center justify-center gap-2 shadow-sm active:scale-98 transition font-bold text-xs"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>가이드 즉시 전화 연결 (1-Tap Call)</span>
            </a>
          </div>

          {/* 2. 2x2 Emergency Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* 일본 경찰 */}
            <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between gap-2 border border-slate-200 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <ShieldAlert className="w-4 h-4 text-brand-blue" />
                  <span className="text-[10px] text-slate-500 font-medium">치안/신고</span>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-1">일본 경찰</p>
                <p className="text-lg font-black text-brand-blue">110</p>
              </div>
              <a
                href="tel:110"
                className="w-full h-8 rounded-lg bg-brand-indigo hover:bg-blue-900 text-white flex items-center justify-center gap-1 text-[11px] font-bold active:scale-95 transition"
              >
                <Phone className="w-3 h-3" />
                <span>전화 연결</span>
              </a>
            </div>

            {/* 구급 / 화재 */}
            <div className="bg-rose-50/80 rounded-xl p-3 flex flex-col justify-between gap-2 border border-rose-200 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Siren className="w-4 h-4 text-rose-600" />
                  <span className="text-[10px] text-rose-600 font-medium">응급/화재</span>
                </div>
                <p className="text-xs font-bold text-rose-900 mt-1">구급 / 화재</p>
                <p className="text-lg font-black text-rose-600">119</p>
              </div>
              <a
                href="tel:119"
                className="w-full h-8 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-1 text-[11px] font-bold active:scale-95 transition"
              >
                <Phone className="w-3 h-3" />
                <span>긴급 연결</span>
              </a>
            </div>

            {/* 주 일본 대사관 */}
            <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between gap-2 border border-slate-200 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Building2 className="w-4 h-4 text-slate-700" />
                  <span className="text-[10px] text-slate-500 font-medium">도쿄</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800 mt-1 leading-snug line-clamp-1">
                  주 일본 대한민국 대사관
                </p>
                <p className="text-[10px] text-slate-500 font-mono">+81-3-3452-7611</p>
              </div>
              <a
                href="tel:+81334527611"
                className="w-full h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold active:scale-95 transition"
              >
                <Phone className="w-3 h-3" />
                <span>전화 연결</span>
              </a>
            </div>

            {/* 외교부 영사콜센터 */}
            <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between gap-2 border border-slate-200 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Headphones className="w-4 h-4 text-slate-700" />
                  <span className="text-[10px] text-slate-500 font-medium">24시간</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800 mt-1 leading-snug line-clamp-1">
                  외교부 영사콜센터
                </p>
                <p className="text-[10px] text-slate-500 font-mono">+82-2-3210-0404</p>
              </div>
              <a
                href="tel:+82232100404"
                className="w-full h-8 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center gap-1 text-[11px] font-bold active:scale-95 transition"
              >
                <Phone className="w-3 h-3" />
                <span>전화 연결</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

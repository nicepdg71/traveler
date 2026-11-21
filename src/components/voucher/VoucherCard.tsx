import React from 'react';
import { VoucherItem } from '../../types';
import { Plane, Building2, Ticket, QrCode } from 'lucide-react';

interface VoucherCardProps {
  voucher: VoucherItem;
  onOpenQR: (voucher: VoucherItem) => void;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, onOpenQR }) => {
  const getIcon = () => {
    switch (voucher.type) {
      case 'FLIGHT':
        return <Plane className="w-4 h-4 text-sky-600" />;
      case 'HOTEL':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'ATTRACTION':
        return <Ticket className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getBadgeClass = () => {
    switch (voucher.type) {
      case 'FLIGHT':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'HOTEL':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'ATTRACTION':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm transition hover:shadow-md">
      {/* 카드 상단 */}
      <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60">
            {getIcon()}
          </div>
          <div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${getBadgeClass()}`}>
              {voucher.statusBadge}
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
              {voucher.title}
            </h3>
          </div>
        </div>
      </div>

      {/* 일정 및 탑승자 정보 */}
      <div className="mt-2.5 space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">일정 / 기간</span>
          <span className="font-semibold text-slate-800">{voucher.schedule}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">예약자 / 대상</span>
          <span className="font-medium text-slate-700">{voucher.passengerOrGuest}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">예약번호</span>
          <span className="font-mono font-bold text-brand-indigo">{voucher.bookingRef}</span>
        </div>
      </div>

      {/* 세부 스펙 칩 */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {voucher.details.map((d, i) => (
          <span
            key={i}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
          >
            {d.label}: <strong className="text-slate-800">{d.value}</strong>
          </span>
        ))}
      </div>

      {/* 액션 버튼 */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">
          오프라인 자동 저장됨
        </span>
        <button
          onClick={() => onOpenQR(voucher)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-indigo text-white text-xs font-bold hover:bg-blue-900 shadow-sm active:scale-95 transition"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR 코드 확대</span>
        </button>
      </div>
    </div>
  );
};

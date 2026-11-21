import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VoucherCard } from './VoucherCard';
import { QRCodeModal } from './QRCodeModal';
import { VoucherItem } from '../../types';
import { ShieldCheck, Ticket } from 'lucide-react';

export const VoucherView: React.FC = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'FLIGHT' | 'HOTEL' | 'ATTRACTION'>('ALL');
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherItem | null>(null);

  const filteredVouchers = state.vouchers.filter((v) => {
    if (filter === 'ALL') return true;
    return v.type === filter;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* 1. 상단 오프라인 안내 배너 */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <p className="text-xs font-bold text-emerald-900">
            오프라인 월렛 저장 완료
          </p>
          <p className="text-[11px] text-emerald-700">
            현지 데이터 로밍이 끊겨도 QR코드와 예약번호를 언제든 즉시 조회할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 2. 분류 필터 탭 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-brand-indigo" />
          <h2 className="text-sm font-bold text-slate-900">
            내 바우처 월렛 ({filteredVouchers.length}건)
          </h2>
        </div>

        <div className="flex items-center gap-1">
          {(['ALL', 'FLIGHT', 'HOTEL', 'ATTRACTION'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                filter === type
                  ? 'bg-brand-indigo text-white shadow-xs'
                  : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
              }`}
            >
              {type === 'ALL'
                ? '전체'
                : type === 'FLIGHT'
                ? '항공'
                : type === 'HOTEL'
                ? '호텔'
                : '티켓'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 바우처 카드 목록 */}
      <div className="space-y-3">
        {filteredVouchers.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            voucher={voucher}
            onOpenQR={(v) => setSelectedVoucher(v)}
          />
        ))}
      </div>

      {/* 4. QR 코드 확대 팝업 모달 */}
      <QRCodeModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
      />
    </div>
  );
};

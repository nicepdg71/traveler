import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VoucherCard } from './VoucherCard';
import { QRCodeModal } from './QRCodeModal';
import { TaxiCardModal } from '../sos/TaxiCardModal';
import { SosModal } from '../sos/SosModal';
import { VoucherItem } from '../../types';
import { ShieldCheck, Ticket, Car, AlertCircle, ChevronRight } from 'lucide-react';

export const VoucherView: React.FC = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'FLIGHT' | 'HOTEL' | 'ATTRACTION'>('ALL');
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherItem | null>(null);
  const [isTaxiModalOpen, setIsTaxiModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  const filteredVouchers = state.vouchers.filter((v) => {
    if (filter === 'ALL') return true;
    return v.type === filter;
  });

  return (
    <div className="space-y-3.5 pb-20">
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

      {/* 2. Stitch 모달 런처: 호텔 택시 카드 & 긴급 SOS 버튼 */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setIsTaxiModalOpen(true)}
          className="bg-white hover:bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 shadow-xs flex items-center justify-between text-left transition active:scale-98 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">호텔 택시 카드</p>
              <p className="text-[10px] text-slate-500 truncate">기사용 일본어 카드</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        <button
          onClick={() => setIsSosModalOpen(true)}
          className="bg-white hover:bg-rose-50/60 p-3 rounded-2xl border border-rose-200/80 shadow-xs flex items-center justify-between text-left transition active:scale-98 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-rose-900 truncate">긴급 SOS</p>
              <p className="text-[10px] text-rose-600 truncate">경찰 / 대사관 / 가이드</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>

      {/* 3. 분류 필터 탭 */}
      <div className="flex items-center justify-between pt-1">
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

      {/* 4. 바우처 카드 목록 */}
      <div className="space-y-3">
        {filteredVouchers.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            voucher={voucher}
            onOpenQR={(v) => setSelectedVoucher(v)}
          />
        ))}
      </div>

      {/* 5. 바우처 QR 코드 확대 팝업 모달 */}
      <QRCodeModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
      />

      {/* 6. Stitch 현지어 택시 카드 모달 */}
      <TaxiCardModal
        isOpen={isTaxiModalOpen}
        onClose={() => setIsTaxiModalOpen(false)}
      />

      {/* 7. Stitch 긴급 SOS 모달 */}
      <SosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
      />
    </div>
  );
};

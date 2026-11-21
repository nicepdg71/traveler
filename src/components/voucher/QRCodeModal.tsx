import React from 'react';
import { VoucherItem } from '../../types';
import { X, QrCode, Sparkles, Copy, Check } from 'lucide-react';

interface QRCodeModalProps {
  voucher: VoucherItem | null;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ voucher, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!voucher) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(voucher.bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* 상단 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 뱃지 */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue mb-2">
          <QrCode className="w-3.5 h-3.5" />
          <span>모바일 전자 바우처 (QR)</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {voucher.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">{voucher.passengerOrGuest}</p>

        {/* Mock QR Canvas Card */}
        <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center shadow-inner">
          <div className="bg-white p-3 rounded-xl shadow-md border border-slate-100">
            {/* 정밀 Mock QR SVG */}
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Corners */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F172A" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="#1E3A8A" />

              <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F172A" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="#1E3A8A" />

              <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F172A" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="#1E3A8A" />

              {/* Data Matrix Dots */}
              <rect x="36" y="8" width="6" height="6" rx="1" fill="#0F172A" />
              <rect x="46" y="12" width="6" height="6" rx="1" fill="#2563EB" />
              <rect x="56" y="8" width="6" height="6" rx="1" fill="#0F172A" />
              <rect x="38" y="22" width="6" height="6" rx="1" fill="#0F172A" />
              <rect x="50" y="24" width="8" height="6" rx="1" fill="#0F172A" />

              <rect x="8" y="36" width="6" height="6" rx="1" fill="#0F172A" />
              <rect x="22" y="42" width="6" height="6" rx="1" fill="#2563EB" />
              <rect x="12" y="52" width="8" height="6" rx="1" fill="#0F172A" />

              <rect x="36" y="36" width="10" height="10" rx="2" fill="#1E3A8A" />
              <rect x="52" y="38" width="8" height="8" rx="1" fill="#0F172A" />
              <rect x="42" y="50" width="6" height="6" rx="1" fill="#2563EB" />
              <rect x="52" y="52" width="12" height="6" rx="1" fill="#0F172A" />

              <rect x="70" y="38" width="6" height="8" rx="1" fill="#0F172A" />
              <rect x="82" y="42" width="10" height="6" rx="1" fill="#2563EB" />
              <rect x="74" y="52" width="6" height="6" rx="1" fill="#0F172A" />

              <rect x="38" y="70" width="8" height="6" rx="1" fill="#0F172A" />
              <rect x="50" y="72" width="6" height="12" rx="1" fill="#2563EB" />
              <rect x="62" y="70" width="8" height="6" rx="1" fill="#0F172A" />
              <rect x="40" y="84" width="6" height="8" rx="1" fill="#0F172A" />
              <rect x="58" y="82" width="12" height="10" rx="1" fill="#0F172A" />
              <rect x="76" y="76" width="8" height="6" rx="1" fill="#1E3A8A" />
              <rect x="86" y="84" width="6" height="8" rx="1" fill="#0F172A" />
            </svg>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>현장 키오스크 또는 검표원에게 제시하세요</span>
          </div>
        </div>

        {/* 예약 번호 복사 */}
        <div className="bg-slate-100 rounded-xl p-3 flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Booking Ref</div>
            <div className="text-sm font-extrabold text-slate-900 tracking-wider">
              {voucher.bookingRef}
            </div>
          </div>
          <button
            onClick={handleCopyRef}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨' : '번호 복사'}</span>
          </button>
        </div>

        {/* 상세 내역 요약 */}
        <div className="mt-3 text-left space-y-1 text-xs">
          {voucher.details.map((d, i) => (
            <div key={i} className="flex justify-between py-0.5 border-b border-slate-100 last:border-none">
              <span className="text-slate-400">{d.label}</span>
              <span className="font-semibold text-slate-800">{d.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-brand-indigo text-white font-bold text-xs hover:bg-blue-900 transition shadow-md"
        >
          확인 완료 (닫기)
        </button>
      </div>
    </div>
  );
};

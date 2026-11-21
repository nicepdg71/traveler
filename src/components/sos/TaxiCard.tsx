import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Car, Copy, Check, MapPin, Phone, Volume2 } from 'lucide-react';

export const TaxiCard: React.FC = () => {
  const { state } = useApp();
  const { taxiCard } = state;
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${taxiCard.hotelNameJp} ${taxiCard.addressJp}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const text = `${taxiCard.hotelNameJp}までお願いします。`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('음성 재생을 지원하지 않는 브라우저입니다.');
    }
  };

  const handleOpenMap = () => {
    const encoded = encodeURIComponent(`${taxiCard.hotelNameJp} ${taxiCard.addressJp}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-md relative overflow-hidden">
      {/* 상단 옐로우 뱃지 */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-100">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 shadow-xs">
          <Car className="w-3.5 h-3.5" />
          <span>기사님께 보여주세요 (TAXI CARD)</span>
        </span>
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
            speaking
              ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="일본어 발음 듣기"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
          <span>{speaking ? '재생 중...' : '음성 안내'}</span>
        </button>
      </div>

      {/* 대형 일본어 요청 문구 */}
      <div className="mt-4 p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-center">
        <div className="text-[11px] text-amber-800 font-semibold mb-1">
          목적지 (기사님 제시용)
        </div>
        <p className="text-xl font-black text-slate-900 leading-snug tracking-tight">
          {taxiCard.hotelNameJp} <br />
          <span className="text-amber-800 text-lg">までお願いします</span>
        </p>
        <p className="text-xs text-slate-600 mt-2 font-medium">
          ({taxiCard.hotelNameKr}로 가주세요)
        </p>
      </div>

      {/* 현지 주소 & 랜드마크 */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-[10px] text-slate-400 font-bold">일본어 상세 주소</div>
          <p className="font-semibold text-slate-800 mt-0.5 text-xs select-all">
            {taxiCard.addressJp}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {taxiCard.addressKr}
          </p>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold">주요 랜드마크</div>
            <p className="font-medium text-slate-700 text-[11px]">{taxiCard.landmarkJp}</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold">프론트 전화</div>
            <a
              href={`tel:${taxiCard.phone}`}
              className="text-brand-blue font-bold text-[11px] hover:underline flex items-center gap-1 justify-end"
            >
              <Phone className="w-3 h-3" />
              <span>{taxiCard.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 active:scale-95 transition shadow-xs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? '주소 복사됨' : '일본어 주소 복사'}</span>
        </button>
        <button
          onClick={handleOpenMap}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 active:scale-95 transition shadow-sm"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>구글 지도 열기</span>
        </button>
      </div>
    </div>
  );
};

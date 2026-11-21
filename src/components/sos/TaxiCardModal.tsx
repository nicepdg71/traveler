import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Car, X, MapPin, Copy, Check, Volume2, Radio } from 'lucide-react';

interface TaxiCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaxiCardModal: React.FC<TaxiCardModalProps> = ({ isOpen, onClose }) => {
  const { state } = useApp();
  const { taxiCard } = state;
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullAddress = `${taxiCard.hotelNameJp} ${taxiCard.addressJp} (${taxiCard.landmarkJp})`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayAudio = () => {
    const phrase = `${taxiCard.hotelNameJp}までお願いします。`;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('음성 재생을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 pb-20 sm:pb-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        {/* Top Header Bar with Badge & Close Button */}
        <div className="bg-brand-indigo text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-wider uppercase">
              기사님께 보여주세요 (TAXI CARD)
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Japanese Driver Instruction Area */}
        <div className="p-5 flex flex-col gap-4">
          <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-blue text-[11px] font-bold">
                목적지 (Destination)
              </span>
              <span className="text-xs text-slate-500 font-medium">시부야구</span>
            </div>

            <div className="py-2">
              <h2 className="text-2xl font-black text-slate-900 leading-tight break-keep">
                {taxiCard.hotelNameJp}
              </h2>
              <p className="text-xl font-bold text-brand-blue mt-1">
                までお願いします。
              </p>
            </div>

            <p className="text-xs text-slate-500">
              {taxiCard.hotelNameKr} (Shibuya Excel Hotel Tokyu)
            </p>
          </div>

          {/* Address Details */}
          <div className="flex flex-col gap-1 px-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs text-slate-900 font-bold leading-snug">
                  {taxiCard.addressJp} ({taxiCard.landmarkJp})
                </p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {taxiCard.addressKr} ({taxiCard.landmarkKr})
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Copy Address & Play Audio */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopy}
              type="button"
              className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                copied
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료' : '주소 복사'}</span>
            </button>

            <button
              onClick={handlePlayAudio}
              type="button"
              className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-brand-indigo hover:bg-blue-900 text-white'
              }`}
            >
              {isPlayingAudio ? <Radio className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? '재생 중...' : '음성 재생'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

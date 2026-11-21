import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { cleanInputText, isValidInput } from '../../utils/sanitize';
import { X, Megaphone, AlertCircle } from 'lucide-react';

interface EditNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditNoticeModal: React.FC<EditNoticeModalProps> = ({ isOpen, onClose }) => {
  const { state, updateNotice } = useApp();
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setText(state.notice.text);
    setErrorMessage('');
  }, [state.notice.text, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. 빈 값 및 공백 전용 입력 검증
    if (!isValidInput(text, 2)) {
      setErrorMessage('공지 내용을 최소 2자 이상 입력해주세요 (공백 제외).');
      return;
    }

    // 2. XSS 방어: 위험한 태그 및 특수문자 정제
    const sanitized = cleanInputText(text);
    if (!sanitized) {
      setErrorMessage('유효한 공지 내용을 입력해주세요.');
      return;
    }

    updateNotice(sanitized);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-brand-amber">
            <Megaphone className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">상단 고정 공지 수정</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              공지 내용 (모든 여행객 상단에 고정 표시됩니다) *
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="예: 내일 조식은 07:30 2층 레스토랑, 버스 탑승은 08:30 로비 집합"
              className={`w-full text-xs p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none leading-relaxed transition ${
                errorMessage
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                  : 'border-slate-300 focus:ring-brand-amber'
              }`}
              required
            />
            {errorMessage && (
              <p className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            * 빈 값 및 위험 스크립트는 자동 차단·정제되어 안전하게 보관됩니다.
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition"
            >
              공지 발행하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

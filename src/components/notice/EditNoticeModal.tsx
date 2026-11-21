import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Megaphone } from 'lucide-react';

interface EditNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditNoticeModal: React.FC<EditNoticeModalProps> = ({ isOpen, onClose }) => {
  const { state, updateNotice } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(state.notice.text);
  }, [state.notice.text, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('공지 내용을 입력해주세요.');
      return;
    }
    updateNotice(text.trim());
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
              공지 내용 (모든 여행객 상단에 고정 표시됩니다)
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="예: 내일 조식은 07:30 2층 레스토랑, 버스 탑승은 08:30 로비 집합"
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-amber resize-none leading-relaxed"
              required
            />
          </div>

          <div className="text-[11px] text-slate-400">
            * 저장 즉시 브라우저 LocalStorage에 반영되어 새로고침 후에도 유지됩니다.
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
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
            >
              공지 발행하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

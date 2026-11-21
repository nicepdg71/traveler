import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckSquare } from 'lucide-react';

interface AddChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChecklistModal: React.FC<AddChecklistModalProps> = ({ isOpen, onClose }) => {
  const { addChecklist } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'인원점검' | '준비물' | '일정점검'>('준비물');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('체크 항목을 입력해주세요.');
      return;
    }
    addChecklist(title.trim(), category);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckSquare className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">새 체크리스트 항목 추가</h2>
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
              분류
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['준비물', '인원점검', '일정점검'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 text-xs rounded-lg font-medium border transition ${
                    category === cat
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              항목 내용 *
            </label>
            <input
              type="text"
              placeholder="예: 돼지코 110V 변환 어댑터 챙기기"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
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
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

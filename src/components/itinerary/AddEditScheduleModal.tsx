import React, { useState, useEffect } from 'react';
import { ItineraryItem, ScheduleCategory, ScheduleStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

interface AddEditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: ItineraryItem | null;
}

export const AddEditScheduleModal: React.FC<AddEditScheduleModalProps> = ({
  isOpen,
  onClose,
  initialItem,
}) => {
  const { state, addItinerary, updateItinerary } = useApp();

  const [day, setDay] = useState<number>(state.currentDay);
  const [time, setTime] = useState<string>('12:00');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<ScheduleCategory>('관광');
  const [location, setLocation] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [status, setStatus] = useState<ScheduleStatus>('UPCOMING');

  useEffect(() => {
    if (initialItem) {
      setDay(initialItem.day);
      setTime(initialItem.time);
      setTitle(initialItem.title);
      setCategory(initialItem.category);
      setLocation(initialItem.location);
      setMemo(initialItem.memo);
      setStatus(initialItem.status);
    } else {
      setDay(state.currentDay);
      setTime('12:00');
      setTitle('');
      setCategory('관광');
      setLocation('');
      setMemo('');
      setStatus('UPCOMING');
    }
  }, [initialItem, state.currentDay, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return;
    }

    if (initialItem) {
      updateItinerary({
        ...initialItem,
        day,
        time,
        title,
        category,
        location,
        memo,
        status,
      });
    } else {
      addItinerary({
        day,
        time,
        title,
        category,
        location,
        memo,
        status,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {initialItem ? '일정 수정' : '새 일정 추가'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                일차 (Day)
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value={1}>Day 1 (11.21)</option>
                <option value={2}>Day 2 (11.22)</option>
                <option value={3}>Day 3 (11.23)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                시간
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              카테고리
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['관광', '식사', '숙소', '이동'] as ScheduleCategory[]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 text-xs rounded-lg font-medium border transition ${
                    category === cat
                      ? 'bg-brand-indigo text-white border-brand-indigo shadow-sm'
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
              일정 제목 *
            </label>
            <input
              type="text"
              placeholder="예: 시부야 스카이 전망대"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              장소 및 주소
            </label>
            <input
              type="text"
              placeholder="예: 도쿄도 시부야구 스크램블스퀘어 14층"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              현장 안내 메모
            </label>
            <textarea
              rows={2}
              placeholder="예: 단체 바우처 QR 코드 확인 필요. 모닝콜 시간 안내"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
            />
          </div>

          {initialItem && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                진행 상태
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['UPCOMING', 'IN_PROGRESS', 'COMPLETED'] as ScheduleStatus[]).map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setStatus(st)}
                    className={`py-1 text-xs rounded-lg font-medium border transition ${
                      status === st
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {st === 'UPCOMING' ? '예정' : st === 'IN_PROGRESS' ? '진행 중' : '완료'}
                  </button>
                ))}
              </div>
            </div>
          )}

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
              className="flex-1 py-2 text-xs font-semibold rounded-lg bg-brand-indigo text-white hover:bg-blue-900 shadow-sm"
            >
              {initialItem ? '수정 완료' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

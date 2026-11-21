import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DaySelector } from './DaySelector';
import { TimelineCard } from './TimelineCard';
import { AddEditScheduleModal } from './AddEditScheduleModal';
import { PinnedNoticeBanner } from '../notice/PinnedNoticeBanner';
import { ChecklistWidget } from '../checklist/ChecklistWidget';
import { ItineraryItem } from '../../types';
import { Plus, CalendarX } from 'lucide-react';

export const ItineraryView: React.FC = () => {
  const { state } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);

  const daySchedules = state.itineraries
    .filter((item) => item.day === state.currentDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ItineraryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. 상단 긴급 공지 배너 (Agent B) */}
      <PinnedNoticeBanner />

      {/* 2. 출석 & 준비물 요약 위젯 (Agent B) */}
      <ChecklistWidget />

      {/* 3. 일자별 탭 선택기 (Agent A) */}
      <div className="pt-1">
        <DaySelector />
      </div>

      {/* 4. 일정 헤더 및 '+ 추가' 버튼 */}
      <div className="flex items-center justify-between px-1 pt-1">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <span>Day {state.currentDay} 타임라인</span>
          <span className="text-xs font-normal text-slate-500">
            ({daySchedules.length}개 일정)
          </span>
        </h2>

        {state.userRole === 'GUIDE' && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-indigo text-white hover:bg-blue-900 shadow-sm active:scale-95 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>일정 추가</span>
          </button>
        )}
      </div>

      {/* 5. 타임라인 리스트 */}
      <div className="pt-1 px-1">
        {daySchedules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
            <CalendarX className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">등록된 일정이 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">
              상단의 '일정 추가' 버튼을 눌러 새 투어 일정을 등록하세요.
            </p>
          </div>
        ) : (
          daySchedules.map((item, idx) => (
            <TimelineCard
              key={item.id}
              item={item}
              isLast={idx === daySchedules.length - 1}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* 6. 일정 추가/수정 모달 */}
      <AddEditScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialItem={editingItem}
      />
    </div>
  );
};

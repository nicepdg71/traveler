import React from 'react';
import { ItineraryItem, ScheduleCategory, ScheduleStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { Check, Clock, Play, MapPin, Edit2, Trash2 } from 'lucide-react';

interface TimelineCardProps {
  item: ItineraryItem;
  isLast: boolean;
  onEdit: (item: ItineraryItem) => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, isLast, onEdit }) => {
  const { state, toggleScheduleStatus, deleteItinerary } = useApp();

  const getCategoryBadge = (cat: ScheduleCategory) => {
    switch (cat) {
      case '관광':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '식사':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case '숙소':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case '이동':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case 'COMPLETED':
        return {
          label: '완료',
          class: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
          icon: Check,
        };
      case 'IN_PROGRESS':
        return {
          label: '진행 중',
          class: 'bg-blue-50 text-blue-700 border-blue-300 font-bold animate-pulse',
          icon: Play,
        };
      case 'UPCOMING':
      default:
        return {
          label: '예정',
          class: 'bg-slate-100 text-slate-500 border-slate-200',
          icon: Clock,
        };
    }
  };

  const statusInfo = getStatusBadge(item.status);
  const StatusIcon = statusInfo.icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`'${item.title}' 일정을 삭제하시겠습니까?`)) {
      deleteItinerary(item.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(item);
  };

  return (
    <div className="flex gap-3 relative">
      {/* Timeline Node & Line */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => toggleScheduleStatus(item.id)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 z-10 ${
            item.status === 'COMPLETED'
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : item.status === 'IN_PROGRESS'
              ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-blue-200'
              : 'bg-white border-slate-300 text-slate-400 hover:border-slate-400'
          }`}
          title="상태 변경 토글 (클릭)"
        >
          <StatusIcon className="w-3.5 h-3.5" />
        </button>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 min-h-[50px] my-1 transition-colors ${
              item.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-slate-200'
            }`}
          />
        )}
      </div>

      {/* Card Content */}
      <div
        className={`flex-1 mb-3 rounded-xl p-3.5 bg-white border transition-all ${
          item.status === 'IN_PROGRESS'
            ? 'border-brand-blue shadow-md border-l-4'
            : item.status === 'COMPLETED'
            ? 'border-slate-200 opacity-90'
            : 'border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              {item.time}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${getCategoryBadge(
                item.category
              )}`}
            >
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleScheduleStatus(item.id)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition flex items-center gap-1 ${statusInfo.class}`}
            >
              <StatusIcon className="w-2.5 h-2.5" />
              {statusInfo.label}
            </button>

            {state.userRole === 'GUIDE' && (
              <div className="flex items-center gap-1 ml-1 text-slate-400">
                <button
                  onClick={handleEdit}
                  className="p-1 hover:text-brand-blue rounded hover:bg-slate-100"
                  title="수정"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 hover:text-rose-500 rounded hover:bg-rose-50"
                  title="삭제"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <h3
          className={`text-sm font-bold mt-1 text-slate-900 ${
            item.status === 'COMPLETED' ? 'line-through text-slate-500' : ''
          }`}
        >
          {item.title}
        </h3>

        {item.location && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
        )}

        {item.memo && (
          <div className="mt-2 text-xs bg-slate-50 text-slate-600 p-2 rounded-lg border border-slate-100 leading-relaxed">
            {item.memo}
          </div>
        )}
      </div>
    </div>
  );
};

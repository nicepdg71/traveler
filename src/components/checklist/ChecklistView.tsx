import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from './ProgressBar';
import { AddChecklistModal } from './AddChecklistModal';
import { Check, Plus, Trash2, CheckCircle2, ListFilter } from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const { state, toggleChecklist, deleteChecklist } = useApp();
  const [filter, setFilter] = useState<'ALL' | '준비물' | '인원점검' | '일정점검'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = state.checklists.length;
  const completed = state.checklists.filter((c) => c.isChecked).length;

  const filteredItems = state.checklists.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* 1. 진행률 종합 카드 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">투어 체크리스트 관리</h2>
              <p className="text-[11px] text-slate-500">인원 점검 및 필수 준비물</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-95 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>항목 추가</span>
          </button>
        </div>

        <ProgressBar total={total} completed={completed} showText={true} />
      </div>

      {/* 2. 필터 탭 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['ALL', '준비물', '인원점검', '일정점검'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
              filter === cat
                ? 'bg-brand-indigo text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? '전체 보기' : cat}
          </button>
        ))}
      </div>

      {/* 3. 체크리스트 항목 목록 */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 p-4">
            <ListFilter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-500">해당 분류의 체크 항목이 없습니다.</p>
          </div>
        ) : (
          filteredItems.map((chk) => (
            <div
              key={chk.id}
              onClick={() => toggleChecklist(chk.id)}
              className="flex items-center gap-3 p-3.5 hover:bg-slate-50/80 cursor-pointer transition select-none group"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  chk.isChecked
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'border-slate-300 bg-white group-hover:border-slate-400'
                }`}
              >
                {chk.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-slate-100 text-slate-600">
                    {chk.category}
                  </span>
                  {chk.assignedCount && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-blue-50 text-blue-700">
                      출석: {chk.assignedCount.checked}/{chk.assignedCount.total}명 완료
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs font-medium mt-0.5 truncate ${
                    chk.isChecked ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {chk.title}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChecklist(chk.id);
                }}
                className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                title="삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      <AddChecklistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

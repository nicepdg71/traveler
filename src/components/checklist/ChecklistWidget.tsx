import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from './ProgressBar';
import { Check, CheckSquare, ArrowRight } from 'lucide-react';

export const ChecklistWidget: React.FC = () => {
  const { state, toggleChecklist, setActiveTab } = useApp();

  const total = state.checklists.length;
  const completed = state.checklists.filter((c) => c.isChecked).length;
  // 상위 3개만 미리보기
  const previewItems = state.checklists.slice(0, 3);

  return (
    <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>출석 및 필수 준비물 체크</span>
        </div>
        <button
          onClick={() => setActiveTab('CHECKLIST')}
          className="text-[11px] font-semibold text-brand-blue flex items-center gap-0.5 hover:underline"
        >
          <span>전체보기</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <ProgressBar total={total} completed={completed} showText={true} />

      <div className="mt-3 space-y-1.5">
        {previewItems.map((chk) => (
          <div
            key={chk.id}
            onClick={() => toggleChecklist(chk.id)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition select-none"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                chk.isChecked
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {chk.isChecked && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              className={`text-xs flex-1 truncate ${
                chk.isChecked ? 'line-through text-slate-400' : 'text-slate-700'
              }`}
            >
              {chk.title}
            </span>
            {chk.assignedCount && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                {chk.assignedCount.checked}/{chk.assignedCount.total}명
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

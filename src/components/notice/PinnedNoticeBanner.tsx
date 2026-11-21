import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EditNoticeModal } from './EditNoticeModal';
import { Megaphone, Edit3 } from 'lucide-react';

export const PinnedNoticeBanner: React.FC = () => {
  const { state } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-3 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <span className="p-1 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
              <Megaphone className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-amber-800">
                  현장 가이드 긴급 공지
                </span>
                <span className="text-[10px] text-amber-600">
                  {state.notice.updatedAt}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-800 mt-1 leading-relaxed">
                {state.notice.text}
              </p>
            </div>
          </div>

          {state.userRole === 'GUIDE' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-100/50 shadow-xs transition"
            >
              <Edit3 className="w-3 h-3" />
              <span>수정</span>
            </button>
          )}
        </div>
      </div>

      <EditNoticeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

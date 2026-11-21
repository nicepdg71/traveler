import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, ShieldAlert, PhoneCall } from 'lucide-react';

export const EmergencyContacts: React.FC = () => {
  const { state } = useApp();
  const { emergencyContacts } = state;

  const guideContact = emergencyContacts.find((c) => c.isDirectCall) || emergencyContacts[0];
  const otherContacts = emergencyContacts.filter((c) => c.id !== guideContact.id);

  return (
    <div className="space-y-3">
      {/* 1. 가이드 직통 대형 통화 카드 */}
      <div className="bg-gradient-to-br from-brand-indigo to-blue-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              가이드 상시 연결
            </span>
            <span className="text-[11px] text-blue-200">24시간 긴급</span>
          </div>

          <h3 className="text-lg font-bold mt-2">{guideContact.name}</h3>
          <p className="text-xs text-blue-200 mt-0.5">{guideContact.subText}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-mono text-base font-extrabold tracking-wider text-amber-300">
              {guideContact.phone}
            </span>
            <a
              href={`tel:${guideContact.phone}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md active:scale-95 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>즉시 통화 연결</span>
            </a>
          </div>
        </div>

        {/* 배경 은은한 아이콘 */}
        <Phone className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 pointer-events-none" />
      </div>

      {/* 2. 공관 및 긴급 신고 전화 그리드 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-3">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>공관 및 현지 긴급 신고 연락처</span>
        </h4>

        <div className="grid grid-cols-1 gap-2">
          {otherContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">{contact.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-medium">
                    {contact.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{contact.subText}</p>
              </div>

              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-brand-blue hover:border-brand-blue font-bold text-xs shadow-xs active:scale-95 transition"
              >
                <Phone className="w-3 h-3" />
                <span>{contact.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

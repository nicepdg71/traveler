import React from 'react';
import { TaxiCard } from './TaxiCard';
import { EmergencyContacts } from './EmergencyContacts';
import { JapanesePhrases } from './JapanesePhrases';

export const SosView: React.FC = () => {
  return (
    <div className="space-y-4 pb-20">
      {/* 1. 현지어 택시 쇼잉 카드 (최우선 배치) */}
      <TaxiCard />

      {/* 2. 가이드 및 긴급 연락망 */}
      <EmergencyContacts />

      {/* 3. 상황별 긴급 일본어 회화 */}
      <JapanesePhrases />
    </div>
  );
};

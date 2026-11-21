import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ItineraryView } from '../itinerary/ItineraryView';
import { ChecklistView } from '../checklist/ChecklistView';
import { VoucherView } from '../voucher/VoucherView';
import { SosView } from '../sos/SosView';

export const AppShell: React.FC = () => {
  const { state } = useApp();

  const renderActiveView = () => {
    switch (state.activeTab) {
      case 'ITINERARY':
        return <ItineraryView />;
      case 'CHECKLIST':
        return <ChecklistView />;
      case 'VOUCHER':
        return <VoucherView />;
      case 'SOS':
        return <SosView />;
      default:
        return <ItineraryView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-200/50 flex justify-center">
      {/* 390px Mobile First Viewport Container */}
      <div className="w-full max-w-md bg-[#F7F9FB] min-h-screen shadow-2xl flex flex-col relative border-x border-slate-200">
        <Header />

        <main className="flex-1 p-4 overflow-y-auto">
          {renderActiveView()}
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

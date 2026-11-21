import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, ItineraryItem, ScheduleStatus, TabType, UserRole } from '../types';
import { loadStoredState, saveStoredState, clearStoredState } from '../utils/storage';

interface AppContextType {
  state: AppState;
  setCurrentDay: (day: number) => void;
  setActiveTab: (tab: TabType) => void;
  setUserRole: (role: UserRole) => void;
  updateNotice: (text: string) => void;
  toggleScheduleStatus: (id: string) => void;
  addItinerary: (item: Omit<ItineraryItem, 'id'>) => void;
  updateItinerary: (item: ItineraryItem) => void;
  deleteItinerary: (id: string) => void;
  toggleChecklist: (id: string) => void;
  addChecklist: (title: string, category: '인원점검' | '준비물' | '일정점검') => void;
  deleteChecklist: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => loadStoredState());

  useEffect(() => {
    saveStoredState(state);
  }, [state]);

  const setCurrentDay = (day: number) => {
    setState((prev) => ({ ...prev, currentDay: day }));
  };

  const setActiveTab = (tab: TabType) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  };

  const setUserRole = (role: UserRole) => {
    setState((prev) => ({ ...prev, userRole: role }));
  };

  const updateNotice = (text: string) => {
    setState((prev) => ({
      ...prev,
      notice: {
        ...prev.notice,
        text,
        updatedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      },
    }));
  };

  const toggleScheduleStatus = (id: string) => {
    setState((prev) => {
      const nextStatusMap: Record<ScheduleStatus, ScheduleStatus> = {
        UPCOMING: 'IN_PROGRESS',
        IN_PROGRESS: 'COMPLETED',
        COMPLETED: 'UPCOMING',
      };

      const updated = prev.itineraries.map((item) => {
        if (item.id === id) {
          return { ...item, status: nextStatusMap[item.status] };
        }
        return item;
      });

      return { ...prev, itineraries: updated };
    });
  };

  const addItinerary = (item: Omit<ItineraryItem, 'id'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: `itin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setState((prev) => ({
      ...prev,
      itineraries: [...prev.itineraries, newItem].sort((a, b) => a.time.localeCompare(b.time)),
    }));
  };

  const updateItinerary = (updatedItem: ItineraryItem) => {
    setState((prev) => ({
      ...prev,
      itineraries: prev.itineraries
        .map((item) => (item.id === updatedItem.id ? updatedItem : item))
        .sort((a, b) => a.time.localeCompare(b.time)),
    }));
  };

  const deleteItinerary = (id: string) => {
    setState((prev) => ({
      ...prev,
      itineraries: prev.itineraries.filter((item) => item.id !== id),
    }));
  };

  const toggleChecklist = (id: string) => {
    setState((prev) => ({
      ...prev,
      checklists: prev.checklists.map((chk) => {
        if (chk.id === id) {
          const nextChecked = !chk.isChecked;
          let nextAssignedCount = chk.assignedCount;
          if (chk.assignedCount) {
            nextAssignedCount = {
              ...chk.assignedCount,
              checked: nextChecked ? chk.assignedCount.total : 0,
            };
          }
          return { ...chk, isChecked: nextChecked, assignedCount: nextAssignedCount };
        }
        return chk;
      }),
    }));
  };

  const addChecklist = (title: string, category: '인원점검' | '준비물' | '일정점검') => {
    const newChk = {
      id: `chk-${Date.now()}`,
      title,
      category,
      isChecked: false,
    };
    setState((prev) => ({
      ...prev,
      checklists: [...prev.checklists, newChk],
    }));
  };

  const deleteChecklist = (id: string) => {
    setState((prev) => ({
      ...prev,
      checklists: prev.checklists.filter((chk) => chk.id !== id),
    }));
  };

  const resetAllData = () => {
    const fresh = clearStoredState();
    setState(fresh);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setCurrentDay,
        setActiveTab,
        setUserRole,
        updateNotice,
        toggleScheduleStatus,
        addItinerary,
        updateItinerary,
        deleteItinerary,
        toggleChecklist,
        addChecklist,
        deleteChecklist,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

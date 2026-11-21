export type ScheduleCategory = '이동' | '관광' | '식사' | '숙소';
export type ScheduleStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export interface ItineraryItem {
  id: string;
  day: number; // 1, 2, 3...
  time: string; // "09:00"
  title: string;
  category: ScheduleCategory;
  location: string;
  memo: string;
  status: ScheduleStatus;
}

export interface Notice {
  id: string;
  text: string;
  updatedAt: string;
  author: string;
  isUrgent: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: '인원점검' | '준비물' | '일정점검';
  isChecked: boolean;
  assignedCount?: {
    checked: number;
    total: number;
  };
}

export interface VoucherItem {
  id: string;
  type: 'FLIGHT' | 'HOTEL' | 'ATTRACTION';
  title: string;
  bookingRef: string;
  passengerOrGuest: string;
  schedule: string;
  details: { label: string; value: string }[];
  qrPayload: string;
  statusBadge: string;
}

export interface TaxiCardInfo {
  hotelNameKr: string;
  hotelNameJp: string;
  addressJp: string;
  addressKr: string;
  landmarkJp: string;
  landmarkKr: string;
  phone: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  subText: string;
  isDirectCall?: boolean;
}

export type TabType = 'ITINERARY' | 'CHECKLIST' | 'VOUCHER' | 'SOS';
export type UserRole = 'GUIDE' | 'TRAVELER';

export interface AppState {
  currentDay: number;
  activeTab: TabType;
  userRole: UserRole;
  notice: Notice;
  itineraries: ItineraryItem[];
  checklists: ChecklistItem[];
  vouchers: VoucherItem[];
  taxiCard: TaxiCardInfo;
  emergencyContacts: EmergencyContact[];
}

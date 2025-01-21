export interface CalendarState {
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
  isLoadingEvents: boolean;
}

export interface CalendarEvent {
  id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    uid: string;
    name: string;
  };
}

export const initialState: CalendarState = {
  events: [],
  isLoadingEvents: true,
  activeEvent: null,
};

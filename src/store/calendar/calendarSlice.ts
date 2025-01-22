import { CalendarEvent, initialState } from "./interfaces/calendar.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.isLoadingEvents = false;
      state.events = action.payload;
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});
export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;

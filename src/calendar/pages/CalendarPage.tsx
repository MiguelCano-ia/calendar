import { Calendar } from "react-big-calendar";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";
import { localizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { CalendarEvent as CalendarStore } from "../../store";
import { useEffect } from "react";
import { useAuthStore } from "../../auth/hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const lastView = localStorage.getItem("lastView") || "week";

  const eventStyleGetter = (event: CalendarStore) => {
    const isMyEvent = user._id === event.user?._id;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event: CalendarStore) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event: string) => {
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView as never}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

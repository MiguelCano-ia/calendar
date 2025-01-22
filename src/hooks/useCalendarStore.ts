import Swal from "sweetalert2";
import { calendarApi } from "../auth/api";
import { converEventsToDateEvents } from "../helpers";
import {
  CalendarEvent,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { AxiosError } from "axios";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    try {
      if (calendarEvent.id && calendarEvent.user !== user) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }

      const { data } = await calendarApi.post("/events", calendarEvent);
      const userWithOutToken = { _id: user._id || "", name: user.name || "" };
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: userWithOutToken,
        })
      );
    } catch (error) {
      console.log(error);
      const errorMessage =
        (error as AxiosError<{ msg: string }>).response?.data?.msg ||
        "An error occurred";
      Swal.fire("Error saving", errorMessage, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent?.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      const errorMessage = (error as AxiosError<{ msg: string }>).response?.data
        .msg;
      Swal.fire("Error deleting", errorMessage, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = converEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};

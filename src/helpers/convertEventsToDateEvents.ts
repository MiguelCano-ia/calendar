import { parseISO } from "date-fns";
import { CalendarEvent } from "../store";

export const converEventsToDateEvents = (events: CalendarEvent[]) => {
  return events.map((event) => {
    return {
      ...event,
      end: typeof event.end === "string" ? parseISO(event.end) : event.end,
      start:
        typeof event.start === "string" ? parseISO(event.start) : event.start,
    };
  });
};

import { create } from "zustand";

type Event = {
  id: number;
  title: string;
  description?: string;
  eventDate: Date;
};

interface EventState {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
}

export const useEventStore = create<EventState>()((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event].sort(
        (a, b) => a.eventDate.getTime() - b.eventDate.getTime(),
      ),
    })),
  removeEvent: (event) =>
    set((state) => ({ events: state.events.filter((e) => e.id !== event.id) })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events
        .map((e) => (e.id === event.id ? event : e))
        .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime()),
    })),
}));

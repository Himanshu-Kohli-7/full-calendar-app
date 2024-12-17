import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventList from "./components/EventList";
import PopupModal from "./components/PopupModal";
import "tailwindcss/tailwind.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [popupEvent, setPopupEvent] = useState(null);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage
  useEffect(() => {
    if (events.length) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  // Handle event drop
  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, start: event.startStr, end: event.endStr } : e
    );
    setEvents(updatedEvents);
  };

  // Handle event receive
  const handleEventReceive = (info) => {
    const { draggedEl } = info;
    const newEvent = {
      id: `${new Date().getTime()}`,
      title: draggedEl.innerText,
      start: info.event.startStr,
      end: info.event.endStr,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Show popup on event click
  const handleEventClick = (info) => {
    setPopupEvent({
      id: info.event.id,
      title: info.event.title,
    });
  };

  // Handle event deletion
  const handleDeleteEvent = () => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== popupEvent.id));
    setPopupEvent(null);
  };

  return (
    <div className="p-4 max-w-full mx-auto relative">
      {/* Event List */}
      <EventList />
      {/* FullCalendar Component */}
      <div className="overflow-hidden lg:overflow-auto">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable
          droppable
          events={events}
          eventDrop={handleEventDrop}
          eventReceive={handleEventReceive}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          slotDuration="00:30:00"
          slotLabelInterval="01:00"
          slotMinTime="00:00:00"
          slotMaxTime="23:59:00"
          height="auto"
          contentHeight="auto"
          aspectRatio={1.5}
        />
      </div>

      {/* Popup Modal */}
      {popupEvent && (
        <PopupModal
          popupEvent={popupEvent}
          onDelete={handleDeleteEvent}
          onCancel={() => setPopupEvent(null)}
        />
      )}
    </div>
  );
};

export default App;

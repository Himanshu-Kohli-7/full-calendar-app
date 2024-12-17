import React, { useEffect } from "react";

import { Draggable } from "@fullcalendar/interaction";

const EventList = () => {
  // draggable event
  useEffect(() => {
    const draggable = new Draggable(document.querySelector("#event-list"), {
      itemSelector: ".event-item",
      eventData: (eventEl) => ({
        title: eventEl.innerText,
        id: `${new Date().getTime()}`,
      }),
    });

    return () => draggable.destroy();
  }, []);

  return (
    <div
      id="event-list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6"
    >
      {["Event1", "Event2", "Event3", "Event4", "Event5"].map(
        (event, index) => (
          <div
            key={index}
            className="event-item bg-blue-500 text-white p-3 cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-400 text-center"
          >
            {event}
          </div>
        )
      )}
    </div>
  );
};

export default EventList;

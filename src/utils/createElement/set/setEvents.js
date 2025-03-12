const setEvents = (element, events) => {
  Object.entries(events).forEach(([eventType, handler]) => {
    element.addEventListener(eventType, handler);
  });
};

export default setEvents;

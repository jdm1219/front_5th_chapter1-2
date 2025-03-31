const eventMap = new Map();

export function setupEventListeners(root) {
  eventMap.forEach((handlers, eventType) =>
    root.addEventListener(eventType, (e) => {
      handlers.forEach(([element, handler]) => {
        if (element.contains(e.target)) {
          handler(e);
        }
      });
    }),
  );
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.get(eventType)) {
    eventMap.set(eventType, []);
  }
  eventMap.get(eventType).push([element, handler]);
}

export function removeEvent(element, eventType, handler) {
  const eventHandlers = eventMap.get(eventType);
  if (!eventHandlers) return;
  const targetEventIndex = eventHandlers.findIndex((handlers) => {
    const [_element, _handler] = handlers;
    return element === _element && handler === _handler;
  });
  if (targetEventIndex === -1) return;
  eventHandlers.splice(targetEventIndex, 1);
  if (eventHandlers.length === 0) eventMap.delete(eventType);
}

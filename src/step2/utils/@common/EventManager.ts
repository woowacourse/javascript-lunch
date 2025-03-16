import { $$ } from './domHelper';

interface EventManagerOptions {
  element: HTMLElement;
  eventType: keyof HTMLElementEventMap;
  selector: string;
  callback: (event: Event) => void;
}

class EventManager {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  addEvent(
    eventType: EventManagerOptions['eventType'],
    selector: EventManagerOptions['selector'],
    callback: EventManagerOptions['callback']
  ) {
    const children = [...$$(selector, this.element)];
    const isTarget = (element: HTMLElement) =>
      children.includes(element) || element.closest(selector);

    this.element.addEventListener(eventType, (event) => {
      if (isTarget(event.target as HTMLElement)) callback(event);
    });
  }
}

export default EventManager;

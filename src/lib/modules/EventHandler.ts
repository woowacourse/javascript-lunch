interface EventCallbackProps {
  event: WindowEventMap[keyof WindowEventMap];
  target: HTMLElement;
  currentTarget: HTMLElement;
}

interface AddEventListenerProps {
  eventType: keyof WindowEventMap;
  callback: (props: EventCallbackProps) => void;
  dataAction: string;
}

export class EventHandler {
  #events = new Map<string, { eventType: keyof WindowEventMap; callback: (props: EventCallbackProps) => void }>();

  addEventListener({ eventType, callback, dataAction }: AddEventListenerProps) {
    this.#events.set(dataAction, {
      eventType,
      callback,
    });
  }

  attachEventListener() {
    for (const [dataAction, { eventType, callback }] of this.#events) {
      window.addEventListener(eventType, (event) => {
        const target = event.target as HTMLElement;
        const currentTarget = target.closest(`[data-action="${dataAction}"]`) as HTMLElement;

        if (!currentTarget) return;

        callback({ event, target, currentTarget });

        event.stopImmediatePropagation();
        event.stopPropagation();
      });
    }
  }
}

const eventHandlerInstance = new EventHandler();
export default eventHandlerInstance;

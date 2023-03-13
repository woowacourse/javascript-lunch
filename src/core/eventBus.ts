interface EventList {
  [key: string]: CustomEvent;
}

interface EventBus {
  eventList: EventList;
  dispatch<T>(eventName: string, originData?: T, handler?: (val: T) => any): EventBus;
  subscribe(eventName: string, handler: (val: any) => void): EventBus;
  deleteEvent(eventName: string): EventBus;
}

export const eventBus: EventBus = {
  eventList: {},

  dispatch<T>(eventName: string, originData: T, handler: (val: T) => any = (val) => val): EventBus {
    eventBus.eventList[eventName] = new CustomEvent(eventName, {
      detail: handler(originData),
    });

    document.dispatchEvent(eventBus.eventList[eventName]);

    return eventBus;
  },

  subscribe(eventName: string, handler: (event: any) => void): EventBus {
    document.addEventListener(eventName, ({ detail }: any): void => {
      handler(detail);
    });

    return eventBus;
  },

  deleteEvent(eventName: string): EventBus {
    const { eventList } = eventBus;
    if (eventName in eventList) {
      delete eventBus.eventList[eventName];
    }

    return eventBus;
  },
};

interface EventList {
  [key: string]: CustomEvent;
}

interface EventBus {
  eventList: EventList;
  dispatch<T>(eventName: string, originData?: T, handler?: (val: T) => any): EventBus;
  subscribe(eventName: string, handler: (val: any) => void): EventBus;
}

export const eventBus: EventBus = {
  eventList: {},

  dispatch<T>(eventName: string, originData: T, handler: (val: T) => any = (val) => val): EventBus {
    this.eventList[eventName] = new CustomEvent(eventName, {
      detail: handler(originData),
    });

    document.dispatchEvent(this.eventList[eventName]);

    return eventBus;
  },

  subscribe(eventName: string, handler: (event: any) => void): EventBus {
    document.addEventListener(eventName, ({ detail }: any): void => {
      handler(detail);
    });

    return eventBus;
  },
};

interface EventList {
  [key: string]: CustomEvent;
}

interface EventBus {
  eventList: EventList;
  dispatch<T>(eventName: string, originData?: T, handler?: (val: T) => any): void;
  subscribe(eventName: string, handler: (val: any) => void): void;
}

export const eventBus: EventBus = {
  eventList: {},

  dispatch<T>(eventName: string, originData: T, handler: (val: T) => any = (val) => val): void {
    this.eventList[eventName] = new CustomEvent(eventName, {
      detail: handler(originData),
    });

    document.dispatchEvent(this.eventList[eventName]);
  },

  subscribe(eventName: string, handler: (event: any) => void): void {
    document.addEventListener(eventName, ({ detail }: any): void => {
      handler(detail);
    });
  },
};

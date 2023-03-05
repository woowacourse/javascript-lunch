interface EventList {
  [key: string]: CustomEvent;
}

interface EventBus {
  eventList: EventList;
  dispatch(eventName: string, originData?: any, handler?: (val: any) => any): void;
  subscribe(eventName: string, handler: (val: any) => void): void;
}

export const eventBus: EventBus = {
  eventList: {},
  
  dispatch(eventName: string, originData: any = {}, handler: (val: any) => any = (val) => val): void {
    this.eventList[eventName] = new CustomEvent(eventName, { detail: handler(originData) });
    document.dispatchEvent(this.eventList[eventName]);
  },

  subscribe(eventName: string, handler: (val: any) => void): void {
    document.addEventListener(eventName, ({ detail }: any) => {
      handler(detail);
    });
  },
};
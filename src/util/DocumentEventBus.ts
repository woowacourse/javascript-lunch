const subscribers: Record<string, Function[]> = {};

const notify = (event: Event) => {
  subscribers[event.type].forEach((fn: Function) => fn(event));
};

const initializeEvent = (eventName: string) => {
  subscribers[eventName] = [];
  document.addEventListener(eventName, (event: Event) => notify(event));
};

const DocumentEventBus = {  
  subscribe(eventName: string, callback: Function) {
    if (!subscribers.hasOwnProperty(eventName)) initializeEvent(eventName);
    subscribers[eventName].push(callback);
  },
};

export default DocumentEventBus;

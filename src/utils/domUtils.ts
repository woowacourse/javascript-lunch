export const $ = (selector: string, scope: Document | HTMLElement = document): Element =>{
  if (!selector) throw new Error("no selector");

  return scope.querySelector(selector)!;
}

export const all$ = (selector: string,  scope: Document | HTMLElement = document): Element[] => {
  if (!selector) throw new Error("no selector");

  return Array.from(scope.querySelectorAll(selector));
}

export const on = (target: EventTarget, eventName: string, handler: (event:Event) => void): void => {
  target.addEventListener(eventName, handler);
}

export const newState = (state: any, handler: any) => {
  return new Proxy(state, {
    set(): boolean {
      handler();
      return true;
    },
  });
};








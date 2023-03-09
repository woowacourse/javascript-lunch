export const $ = <T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T => {
  if (!selector) throw new Error('no selector');

  return scope.querySelector<T>(selector)!;
};

export const all$ = (
  selector: string,
  scope: Document | HTMLElement = document
): HTMLElement[] => {
  if (!selector) throw new Error('no selector');

  return Array.from(scope.querySelectorAll(selector));
};

export const on = (
  target: EventTarget,
  eventName: string,
  handler: (event: Event) => void
): void => {
  target.addEventListener(eventName, handler);
};

export const newState = (state: any, handler: any) => {
  return new Proxy(state, {
    set(obj, prop, value): boolean {
      obj[prop] = value;
      handler();
      return true;
    },
  });
};

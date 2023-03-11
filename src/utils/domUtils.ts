export const $ = <T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T => {
  if (!selector) throw new Error('no selector. (function: $)');

  const element = scope.querySelector<T>(selector);

  if (element !== null) {
    return element;
  }

  throw new Error('no element by select. (function: $)');
};

export const all$ = <T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T[] => {
  if (!selector) throw new Error('no selector');

  return Array.from(scope.querySelectorAll<T>(selector));
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

type ImageSrc = { onImage: string; offImage: string };

export const toggleImageSource =
  ({ onImage, offImage }: ImageSrc) =>
  (imageElement: HTMLImageElement): void => {
    // imageElement.src.includes(onImage.slice(1)) : image element의 src 값이 localhost:8080/... .png 로 나타남.
    imageElement.src = imageElement.src.includes(onImage.slice(1)) ? offImage : onImage;
  };

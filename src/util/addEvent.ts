export const addEvent = (
  $target: Element,
  eventType: string,
  selector: string,
  callback: (event: Event) => void
): void => {
  $target.addEventListener(eventType, (event: Event) => {
    if (!(event.target as Element).closest(selector)) return false;
    callback(event);
  });
};

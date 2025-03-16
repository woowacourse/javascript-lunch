interface EventCallbackProps {
  event: WindowEventMap[keyof WindowEventMap];
  target: HTMLElement;
  currentTarget: HTMLElement;
}

export default class EventHandler {
  // eslint-disable-next-line max-params
  static attachEventListener(
    eventType: keyof WindowEventMap,
    callback: (props: EventCallbackProps) => void,
    dataAction: string,
  ) {
    window.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement;
      const currentTarget = target.closest(`[data-action="${dataAction}"]`) as HTMLElement;

      if (currentTarget) {
        callback({ event, target, currentTarget });
        event.stopImmediatePropagation();
        event.stopPropagation();
      }
    });
  }
}

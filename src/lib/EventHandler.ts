export default class EventHandler {
  // eslint-disable-next-line max-params
  static attachEventHandler(
    eventType: string,
    callback: (event: Event, target: HTMLElement) => void,
    dataAction: string,
  ) {
    window.addEventListener(eventType, (event) => {
      const target = event.target as HTMLElement;

      if (target.closest(`[data-action="${dataAction}"]`)) {
        callback(event, target);
        event.stopImmediatePropagation();
      }
    });
  }
}

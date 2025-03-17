export interface EventBinding {
  action: string;
  eventType: keyof HTMLElementEventMap;
  handler: (event: Event) => void;
}

export class EventChannel {
  private $target: HTMLElement;
  private abortController: AbortController;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.abortController = new AbortController();
  }

  bindEvents(eventBindings: EventBinding[]): void {
    // 이벤트 타입별로 그룹화
    const bindingsByType = new Map<
      string,
      { action: string; handler: (event: Event) => void }[]
    >();

    eventBindings.forEach(({ action, eventType, handler }) => {
      if (!bindingsByType.has(eventType)) {
        bindingsByType.set(eventType, []);
      }
      bindingsByType.get(eventType)!.push({ action, handler });
    });

    // 각 이벤트 타입에 대해 리스너 등록
    bindingsByType.forEach((bindings, eventType) => {
      this.$target.addEventListener(
        eventType,
        (event: Event) => {
          const target = event.target as HTMLElement;
          const actionElement = target.closest<HTMLElement>("[data-action]");
          if (!actionElement || !this.$target.contains(actionElement)) return;
          const action = actionElement.dataset.action;
          const binding = bindings.find((b) => b.action === action);
          if (binding) binding.handler.call(null, event);
        },
        { signal: this.abortController.signal }
      );
    });
  }

  destroy(): void {
    this.$target.replaceChildren();
    this.abortController.abort();
    // 새 AbortController로 교체
    this.abortController = new AbortController();
  }
}

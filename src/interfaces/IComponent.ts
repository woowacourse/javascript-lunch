interface IComponentPropState {
  [key: string]: any;
}

interface IComponent<P extends IComponentPropState> {
  $target: HTMLElement;
  $props: P;
  $state: P;
  setup(): void;
  template(): string;
  render(): void;
  mounted(): void;
  setEvent(): void;
  setState(newState: P): void;
  addEvent(
    eventType: string,
    selector: string,
    callback: (event: Event) => void
  ): void;
}

export { IComponentPropState, IComponent };

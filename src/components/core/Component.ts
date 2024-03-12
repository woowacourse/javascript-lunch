interface IComponentProps<T> {
  $target: HTMLElement;
  props: T;
}

class Component<T> {
  $target;
  props: T;
  state: any;

  constructor({ $target, props }: IComponentProps<T>) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup(): void {}

  render(): void {}

  setEvent(): void {}

  setState(newState: any): void {}

  addEvent(eventType: Event, selector: string, callback: any): void {}
}

export default Component;

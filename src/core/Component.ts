import IProps from '@res/interfaces/IProps';

export default class Component {
  $target;
  $props;
  $state: any;

  constructor(target: HTMLElement, props: IProps) {
    this.$target = target;
    this.$props = props;

    this.setup();
    this.setEvent();
    this.render();
  }

  setup(): void {}

  template(): string {
    return '';
  }

  render(): void {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted(): void {}

  setEvent() {}

  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  addEvent(
    eventType: string,
    selector: string,
    callback: (event: Event) => void
  ) {
    this.$target.addEventListener(eventType, (event: Event) => {
      if (!(event.target as HTMLElement).closest(selector)) return false;
      callback(event);
    });
  }
}

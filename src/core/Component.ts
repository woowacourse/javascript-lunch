import { IComponent, IComponentPropState } from '../interfaces/IComponent';

export default class Component<P extends IComponentPropState>
  implements IComponent<P>
{
  $target: HTMLElement;
  $props: P;
  $state!: P;

  constructor(target: HTMLElement, props: P) {
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

  setEvent(): void {}

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
      if ((event.target as HTMLElement).closest(selector)) {
        callback(event);
      }
    });
  }
}

abstract class BaseComponent<PropsType, StateType> {
  protected $root;
  protected props;
  protected abstract state: StateType;

  constructor($root: HTMLElement, props: PropsType) {
    this.$root = $root;
    this.props = props;

    this.setEvent();
  }

  render() {
    this.compose();
    return this.$root;
  }

  protected setState(newState: object) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  protected addEvent(
    selector: string,
    eventType: string,
    listener: (e: Event) => void
  ) {
    this.$root.addEventListener(eventType, (e) => {
      const $targetElement = (e.target as HTMLElement).closest(selector);
      if ($targetElement) {
        listener(e);
      }
    });
  }

  protected abstract setEvent(): void;

  protected abstract compose(): void;
}

export default BaseComponent;

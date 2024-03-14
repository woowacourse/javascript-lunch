import { EventInfo } from '../types/types';

// Component 클래스를 추상 클래스로 선언
abstract class Component extends HTMLElement {
  component!: HTMLElement;
  events: EventInfo[] = [];

  protected connectedCallback(): void {
    const props: Record<string, string> = this.getProps();
    this.innerHTML = this.render(props);
    this.setEvents();
    this.attachEventListeners();
  }

  protected disconnectedCallback(): void {
    this.detachEventListeners();
  }

  /** [Overriding] 이 함수에서 컴포넌트를 랜더링해야 합니다. */
  protected abstract render(props: Object): string;

  /** [Overriding] 이 함수에서 this.addEvent를 호출하여야 합니다. */
  protected abstract setEvents(): void;

  /** 컴포넌트에 이벤트를 추가합니다. */
  protected addEvent({ target, type, handler }: EventInfo): void {
    this.events.push({ target, type, handler });
  }

  protected emitCustomEvent(type: string, detail?: unknown): void {
    const event = new CustomEvent(type, { detail, bubbles: true });
    this.dispatchEvent(event);
  }

  private getProps(): Record<string, string> {
    const props: Record<string, string> = {};

    Object.keys(this.dataset).forEach((key: string): void => {
      props[key] = this.dataset[key]!;
    });

    return props;
  }

  private attachEventListeners(): void {
    this.events.forEach(({ target = document, type, handler }: EventInfo): void => {
      target.addEventListener(type, handler);
    });
  }

  private detachEventListeners(): void {
    this.events.forEach(({ target = document, type, handler }: EventInfo): void => {
      target.removeEventListener(type, handler);
    });
  }
}

export default Component;

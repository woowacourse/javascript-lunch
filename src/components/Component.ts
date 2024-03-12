import { EventInfo } from '../types/component';
import { $ } from '../utils/dom';

// Component 클래스를 추상 클래스로 선언
abstract class Component extends HTMLElement {
  component!: HTMLElement;
  events!: EventInfo[];

  constructor() {
    super();
  }

  protected connectedCallback() {
    this.innerHTML = this.render(this.dataset.props as Object);
    this.setEvents();
    this.attachEventListeners();
  }

  protected disconnectedCallback() {
    this.detachEventListeners();
  }

  /** [Overriding] 이 함수에서 컴포넌트를 랜더링해야 합니다. */
  protected abstract render(props: Object): string;

  /** [Overriding] 이 함수에서 this.addEvent를 호출하여야 합니다. */
  protected abstract setEvents(): EventInfo[];

  /** 이 함수를 호출하여 이벤트를 추가합니다. */
  protected addEvent(eventInfo: EventInfo) {
    this.events.push(eventInfo);
  }

  private attachEventListeners() {
    this.events.forEach(({ target = document, type, handler }: EventInfo): void => {
      target.addEventListener(type, handler);
    });
  }

  private detachEventListeners() {
    this.events.forEach(({ target = document, type, handler }: EventInfo): void => {
      target.removeEventListener(type, handler);
    });
  }
}

export default Component;

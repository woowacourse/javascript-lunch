import { EventInfo } from '../types/component';

// Component 클래스를 추상 클래스로 선언
abstract class Component extends HTMLElement {
  component!: HTMLElement;
  events!: EventInfo[];

  constructor() {
    super();
    this.component = this.createComponent(this.setTemplate());
  }

  protected connectedCallback() {
    this.render();
    this.events = this.setEvents();
    this.attachEventListeners();
  }

  protected disconnectedCallback() {
    this.detachEventListeners();
  }

  /** [Overriding] 이 함수에서 컴포넌트의 템플릿을 문자열로 반환해야 합니다. */
  protected abstract setTemplate(): string;

  /** [Overriding] 이 함수에서 이벤트 객체 리스트를 반환해야 합니다. */
  protected abstract setEvents(): EventInfo[];

  /** [Overriding] 이 함수에서 컴포넌트를 랜더링해야 합니다. */
  protected abstract render(): void;

  private createComponent(template: string): HTMLElement {
    let component: HTMLElement;

    const parser = new DOMParser();
    const doc = parser.parseFromString(template, 'text/html');
    const templateElement = doc.querySelector('template');

    if (templateElement) {
      const content = templateElement.content;
      component = content.firstElementChild as HTMLElement;

      // this.attachShadow({ mode: 'open' }).appendChild(content.cloneNode(true));
    } else {
      throw new Error('Template element is not found.');
    }

    return component;
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

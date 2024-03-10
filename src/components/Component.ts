import { EventInfo } from '../types/component';
import { $ } from '../utils/dom';

// Component 클래스를 추상 클래스로 선언
abstract class Component extends HTMLElement {
  component!: HTMLElement;
  events!: EventInfo[];

  constructor() {
    super();

    const template = this.getTemplate(this.setTemplateId());
    this.component = this.createComponent(template);
  }

  protected connectedCallback() {
    this.render();
    this.events = this.setEvents();
    this.attachEventListeners();
  }

  protected disconnectedCallback() {
    this.detachEventListeners();
  }

  /** [Overriding] 이 함수에서 템플릿의 ID를 반환해야 합니다. */
  protected abstract setTemplateId(): string;

  /** [Overriding] 이 함수에서 이벤트 객체 리스트를 반환해야 합니다. */
  protected abstract setEvents(): EventInfo[];

  /** [Overriding] 이 함수에서 컴포넌트를 랜더링해야 합니다. */
  protected abstract render(): void;

  private getTemplate(templateId: string): HTMLTemplateElement {
    const templateElement = $(templateId);

    if (!(templateElement instanceof HTMLTemplateElement)) {
      throw new Error('The element is not an HTMLTemplateElement.');
    }

    return templateElement;
  }

  private createComponent(template: HTMLTemplateElement): HTMLElement {
    const content = template.content;

    if (!content.firstElementChild) {
      throw new Error('Template does not contain any elements.');
    }

    return content.firstElementChild.cloneNode(true) as HTMLElement;
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

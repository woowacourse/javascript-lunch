import { Attribute } from '../types/ui';
import { $ } from '../utils/domSelectors';

class Caption {
  private attributes: Attribute;
  private eventType: string;
  private defaultMessage?: string;

  constructor(attributes: Attribute, eventType: string, defaultMessage?: string) {
    this.attributes = attributes;
    this.eventType = eventType;
    this.defaultMessage = defaultMessage;
  }

  showErrorMessage(message: string) {
    const caption = $<HTMLSpanElement>(`#${this.attributes.id}-caption`);
    caption.classList.add('error-text');
    caption.textContent = message;
  }

  addRemoveErrorMessageEvent() {
    const element = $<HTMLSelectElement>(`#${this.attributes.id}`);

    element.addEventListener(
      this.eventType,
      (event: Event) => {
        const target = event.target as HTMLElement;
        const caption = $<HTMLSpanElement>(`#${target.id}-caption`);
        caption.classList.remove('error-text');

        if (this.defaultMessage) caption.textContent = this.defaultMessage;
      },
      { once: true }
    );
  }

  create() {
    return `
      <span 
        class="text-caption info-text ${this.attributes.className ?? ''}" 
        id="${this.attributes.id}"
      >
        ${this.defaultMessage ?? ''}
      </span>`;
  }
}

export default Caption;

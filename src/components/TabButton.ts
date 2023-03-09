import { Attribute, ButtonContent } from '../types/types';
import { $ } from '../utils/domSelectors';

class TabButton {
  private attributes: Attribute;
  private content: ButtonContent;

  constructor(attributes: Attribute, content: ButtonContent) {
    this.attributes = attributes;
    this.content = content;
  }

  create() {
    return `
      <button 
        id=${this.attributes.id}
        class="tab-button text-body ${this.attributes.className ?? ''}">
        ${this.content}
      </button>`;
  }

  addEvent(onClick: CallableFunction) {
    const tabButton = $(`#${this.attributes.id}`) as HTMLButtonElement;

    tabButton.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLButtonElement;
      const tabButtons = document.querySelectorAll('.tab-button');

      tabButtons.forEach((tabButton) => {
        tabButton.classList.remove('tab-button--active');
      });

      target.classList.add('tab-button--active');
      onClick(this.attributes.id);
    });
  }
}

export default TabButton;

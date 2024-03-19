import { dom } from '@/util/dom';
import OnOffButton from './OnOffButton';
import './Tab.css';

const ELEMENT_NAME = 'my-tab';

class Tab extends HTMLDivElement {
  #children: NodeListOf<OnOffButton>;
  #selected: HTMLElement;

  constructor() {
    super();
    this.classList.add('custom-tab', ELEMENT_NAME);
    this.#children = dom.getElementAll(this, `:scope > *`);
    this.#selected = dom.getElement(this, ':scope > *');

    this.addEventListener('click', (event) => {
      if (!(event.target instanceof OnOffButton)) return;
      if (!this.contains(event.target)) return;

      Array.from(this.#children).forEach((child) => child.off());
      event.target.on();
      this.#selected = event.target;
    });
  }

  getSelected() {
    return this.#selected;
  }
}

customElements.define(ELEMENT_NAME, Tab, { extends: 'div' });
export default Tab;

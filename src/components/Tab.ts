import { add } from 'cypress/types/lodash';
import OnOffButton from './OnOffButton';
import './Tab.css';

const ELEMENT_NAME = 'my-tab';

class Tab extends HTMLDivElement {
  #selected: HTMLElement;

  constructor() {
    super();
    this.classList.add('custom-tab', ELEMENT_NAME);
    this.#selected = this.querySelector(`div[is=${ELEMENT_NAME}] > *`)!;

    this.addEventListener('click', (event) => {
      if (this.contains(event.target as Node)) {
        (Array.from(this.children) as OnOffButton[]).forEach((child: OnOffButton) => child.off());
        (event.target as OnOffButton).on();
        this.#selected = event.target as HTMLElement;
      }
    });
  }

  getSelected() {
    return this.#selected;
  }
}

customElements.define(ELEMENT_NAME, Tab, { extends: 'div' });
export default Tab;

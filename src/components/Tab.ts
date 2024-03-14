import OnOffButton from './OnOffButton';
import './Tab.css';

class Tab extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('custom-tab');

    this.addEventListener('click', (event) => {
      if (this.contains(event.target as Node)) {
        (Array.from(this.children) as OnOffButton[]).forEach((child: OnOffButton) => child.off());
        (event.target as OnOffButton).on();
      }
    });
  }
}

customElements.define('my-tab', Tab, { extends: 'div' });

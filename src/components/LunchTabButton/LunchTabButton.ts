import './style.css';

const LUNCH_TAB_BUTTON = (value: string) => /* HTML */ ` <button class="button">${value}</button> `;

class LunchTabButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const value = this.getAttribute('value') ?? '';
    this.innerHTML = LUNCH_TAB_BUTTON(value);
  }
}

customElements.define('lunch-tab-button', LunchTabButton);

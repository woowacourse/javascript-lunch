import './style.css';

const LUNCH_TAB_BUTTON = /* HTML */ ` <button class="button">123</button> `;

class LunchTabButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_TAB_BUTTON;
  }
}

customElements.define('lunch-tab-button', LunchTabButton);

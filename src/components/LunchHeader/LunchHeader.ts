import './style.css';
import ADD_BUTTON from '../../imgs/add-button.png';

const LUNCH_HEADER = `
<header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src=${ADD_BUTTON} alt="음식점 추가">
    </button>
  </header>
`;

class LunchHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_HEADER;
  }
}

customElements.define('lunch-header', LunchHeader);
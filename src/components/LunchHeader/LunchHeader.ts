import './style.css';
import { ADD_BUTTON } from '../../imgs/index';

const LUNCH_HEADER_TEMPLATE = /* HTML */ `
  <header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src=${ADD_BUTTON} alt="음식점 추가" />
    </button>
  </header>
`;

class LunchHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  render() {
    this.innerHTML = LUNCH_HEADER_TEMPLATE;
  }

  setEventListener() {
    const button = this.querySelector('.gnb__button');
    button?.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      if (modal?.classList) {
        modal.classList.add('modal--open');
      }
    });
  }
}

customElements.define('lunch-header', LunchHeader);

import { $ } from '../utils/index.js';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const header = document.createElement('header');
    header.classList.add('gnb');
    header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./assets/add-button.png" alt="음식점 추가" />
    </button>
    `;

    $('#app').appendChild(header);
  }
}

export default Header;

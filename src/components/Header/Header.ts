import BaseComponent from '@/components/BaseComponent';
import AddButton from '@assets/add-button.png';
import './Header.css';

class Header extends HTMLElement {
  constructor() {
    super();
    this.role = 'banner';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add('gnb');
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${AddButton} alt="음식점 추가" />
      </button>`;

    this.querySelector('button')?.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.add('modal--open');
    });
  }
}

customElements.define('header-bar', Header);

export default Header;

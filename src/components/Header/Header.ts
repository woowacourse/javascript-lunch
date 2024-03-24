import AddButton from '@assets/add-button.png';
import './Header.css';
import { dom } from '@/util/dom';
import BasicModal from '../Basic/BasicModal';

class Header extends HTMLDivElement {
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

    dom.getElement(this, 'button').addEventListener('click', () => {
      dom.getElement<BasicModal>(document.body, '.new-restaurant-modal').openModal();
    });
  }
}

customElements.define('header-bar', Header, { extends: 'div' });

export default Header;

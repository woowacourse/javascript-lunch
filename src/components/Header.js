import logo from '../assets/add-button.png';
import { $ } from '../utils';

class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.openModalEvent();
    this.titleClickEvent();
  }

  openModalEvent() {
    this.shadowRoot
      .querySelector('#openModal')
      .addEventListener('click', () => {
        $('add-restaurant-modal').openModal();
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
    <header id="head" >
      <h1 id="title" class="text-title">점심 뭐 먹지</h1>
      <button type="button" id="openModal" aria-label="음식점 추가">
        <img src=${logo} alt="음식점 추가" />
      </button>
    </header>
  `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
    .text-title {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      padding: 0 16px;
      background-color: var(--primary-color);
    }
    
    h1 {
      color: #fcfcfd;
      cursor:pointer;
    }
    
    button {
      height: 40px;
      border: none;
      border-radius: 8px;
      background: transparent;
      font-size: 24px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    img {
      display: block;
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  `;

    this.shadowRoot.append(componentStyle);
  }

  titleClickEvent() {
    this.shadowRoot.querySelector('#title').addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  }
}

export default Header;

import logo from '../assets/add-button.png';
import { $ } from '../utils';

class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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
    }
    
    button {
      height: 40px;
    
      border: none;
      border-radius: 8px;
      background: transparent;
    
      font-size: 24px;
      cursor: pointer;
    }
    
    img {
      display: block;
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
`;

    this.shadowRoot.innerHTML = `
      <header id="head" >
        <h1 class="text-title">점심 뭐 먹지</h1>
        <button type="button" id="openModal" aria-label="음식점 추가">
          <img src=${logo} alt="음식점 추가" />
        </button>
      </header>
    `;

    this.shadowRoot.append(componentStyle);

    this.openModalEvent();
  }

  openModalEvent() {
    this.shadowRoot
      .querySelector('#openModal')
      .addEventListener('click', () => {
        $('add-restaurant-modal').modalOpen(true);
        $('body').classList.add('scroll-hidden');
      });
  }
}

export default Header;

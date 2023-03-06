import { GLOBAL_CSS } from '../constants';
import logo from '../assets/add-button.png';
import { $ } from '../utils';

class Header extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .gnb {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
    
      padding: 0 16px;
    
      background-color: var(--primary-color);
    }
    
    .gnb__title {
      color: #fcfcfd;
    }
    
    .gnb__button {
      height: 40px;
    
      border: none;
      border-radius: 8px;
      background: transparent;
    
      font-size: 24px;
      cursor: pointer;
    }
    
    .gnb__button img {
      display: block;
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
`;

    this.shadowRoot.innerHTML = `
    <header id="head" class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" id="openModal" class="gnb__button" aria-label="음식점 추가">
        <img src=${logo} alt="음식점 추가" />
      </button>
    </header>
    `;

    this.shadowRoot.append(globalStyle, componentStyle);
  }
}

export default Header;

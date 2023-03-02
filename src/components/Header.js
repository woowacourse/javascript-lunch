import GLOBAL_CSS from '../constants';

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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

    const template = document.createElement('template');

    template.innerHTML = `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./assets/add-button.png" alt="음식점 추가" />
      </button>
    </header>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
  }
}

export default Header;

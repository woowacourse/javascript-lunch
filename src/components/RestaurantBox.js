import GLOBAL_CSS from '../constants';

class RestaurantBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .restaurant {
        display: flex;
        align-items: flex-start;
      
        padding: 16px 8px;
      
        border-bottom: 1px solid #e9eaed;
      }
      
      .restaurant__category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        min-width: 64px;
        min-height: 64px;
      
        margin-right: 16px;
      
        border-radius: 50%;
        background: var(--lighten-color);
      }
      
      .category-icon {
        width: 36px;
        height: 36px;
      }
      
      .restaurant__info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      
      .restaurant__name {
        margin: 0;
      }
      
      .restaurant__distance {
        color: var(--primary-color);
      }
      
      .restaurant__description {
        display: -webkit-box;
      
        padding-top: 8px;
      
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
`;

    const template = document.createElement('template');

    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';

    template.innerHTML = `
    <li class="restaurant">
          <div class="restaurant__category">
            <img src="./category-chinese.png" alt=${category} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description'];
  }

  attributeChangedCallback(name) {
    if (name === 'category' && name === 'name' && name === 'distance') {
      this.connectedCallback();
    }
  }
}

export default RestaurantBox;

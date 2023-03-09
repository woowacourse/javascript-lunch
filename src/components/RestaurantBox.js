import { shortenString } from '../utils';

class RestaurantBox extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .text-subtitle {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
      }
      
      .text-body {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      }
      
      li {
        display: flex;
        align-items: flex-start;
      
        padding: 16px 8px;
      
        border-bottom: 1px solid #e9eaed;
      }

      @media (max-width: 400px) {
        li {
          padding: 8px 4px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      
      .name {
        margin: 0;
      }
      
      .distance {
        color: var(--primary-color);
      }
      
      .description {
        display: -webkit-box;
      
        padding-top: 8px;
      
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
`;

    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';

    const NAME_SLICE_NUMBER = 18;
    const DESCRIPTION_SLICE_NUMBER = 56;

    this.shadowRoot.innerHTML = `
    <li>
    <category-image category=${category}></category-image>
    <div class="info">
      <h3 class="name text-subtitle">${shortenString(
        name,
        NAME_SLICE_NUMBER
      )}</h3>
      <span class="distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="description text-body">${shortenString(
        description,
        DESCRIPTION_SLICE_NUMBER
      )}</p>
    </div>
  </li>
    `;

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description'];
  }
}

export default RestaurantBox;

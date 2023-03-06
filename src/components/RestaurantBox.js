import { GLOBAL_CSS } from '../constants';
import koreanImage from '../assets/category-korean.png';
import chineseImage from '../assets/category-chinese.png';
import japaneseImage from '../assets/category-japanese.png';
import westernImage from '../assets/category-western.png';
import asianImage from '../assets/category-asian.png';
import etcImage from '../assets/category-etc.png';

class RestaurantBox extends HTMLElement {
  getCategoryImage(category) {
    if (category === '한식') return koreanImage;
    if (category === '중식') return chineseImage;
    if (category === '일식') return japaneseImage;
    if (category === '양식') return westernImage;
    if (category === '아시안') return asianImage;
    if (category === '기타') return etcImage;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
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

    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';

    this.shadowRoot.innerHTML = `
    <li class="restaurant">
          <div class="restaurant__category">
            <img src=${this.getCategoryImage(
              category
            )} alt=${category} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>
    `;

    this.shadowRoot.append(globalStyle, componentStyle);
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

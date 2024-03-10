import Component from './Component';
import koreanCategoryImg from '../assets/category-korean.png';
import japaneseCategoryImg from '../assets/category-japanese.png';
import chineseCategoryImg from '../assets/category-chinese.png';
import asianCategoryImg from '../assets/category-asian.png';
import westernCategoryImg from '../assets/category-western.png';
import etcCategoryImg from '../assets/category-etc.png';

class RestaurantInfo extends Component {
  static observedAttributes = ['category', 'name', 'distance', 'description', 'reference'];

  #category;
  #name;
  #distance;
  #description;

  constructor() {
    super();

    this.#category = this.getAttribute('category');
    this.#name = this.getAttribute('name');
    this.#distance = this.getAttribute('distance');
    this.#description = this.getAttribute('description');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#category = this.getAttribute('category');
    this.#name = this.getAttribute('name');
    this.#distance = this.getAttribute('distance');
    this.#description = this.getAttribute('description');

    this.render();
  }

  displayCategoryIcon(category) {
    switch (category) {
      case '한식':
        return `<img src=${koreanCategoryImg} alt="한식" class="category-icon" />`;
      case '중식':
        return `<img src=${chineseCategoryImg} alt="중식" class="category-icon" />`;
      case '일식':
        return `<img src=${japaneseCategoryImg} alt="일식" class="category-icon" />`;
      case '양식':
        return `<img src=${westernCategoryImg} alt="양식" class="category-icon" />`;
      case '아시안':
        return `<img src=${asianCategoryImg} alt="아시안" class="category-icon" />`;
      case '기타':
        return `<img src=${etcCategoryImg} alt="기타" class="category-icon" />`;
      default:
        return '';
    }
  }

  template() {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          ${this.displayCategoryIcon(this.#category)}
        </div>
        <div class="restaurant__info">
          <h2 class="restaurant__name text-subtitle">${this.#name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.#distance}분 내</span>
          <p class="restaurant__description text-body">
            ${this.#description !== undefined ? this.#description : ''}
          </p>
      </div>
      </li>
    `;
  }
}

export default RestaurantInfo;

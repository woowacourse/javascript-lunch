import Component from './Component';
import koreanCategoryIcon from '../assets/category-korean.png';
import japaneseCategoryIcon from '../assets/category-japanese.png';
import chineseCategoryIcon from '../assets/category-chinese.png';
import asianCategoryIcon from '../assets/category-asian.png';
import westernCategoryIcon from '../assets/category-western.png';
import etcCategoryIcon from '../assets/category-etc.png';
import favoriteLinedIcon from '../assets/favorite-icon-lined.png';
import favoriteFilledIcon from '../assets/favorite-icon-filled.png';

class RestaurantItem extends Component {
  static observedAttributes: string[] = ['category', 'name', 'distance', 'description', 'reference', 'favorite'];

  #category: string | null;
  #name: string | null;
  #distance: string | null;
  #description: string | null;
  #favorite: boolean;

  constructor() {
    super();
    this.#category = this.getAttribute('category');
    this.#name = this.getAttribute('name');
    this.#distance = this.getAttribute('distance');
    this.#description = this.getAttribute('description');
    this.#favorite = this.#convertStringToBoolean(this.getAttribute('favorite'));
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'favorite') {
      this.#favorite = this.#convertStringToBoolean(newValue);
    } else {
      this.#category = this.getAttribute('category');
      this.#name = this.getAttribute('name');
      this.#distance = this.getAttribute('distance');
      this.#description = this.getAttribute('description');
    }
    this.render();
  }

  #displayCategoryIcon(category: string | null): string {
    switch (category) {
      case '한식':
        return `<img src=${koreanCategoryIcon} alt="한식" class="category-icon" />`;
      case '중식':
        return `<img src=${chineseCategoryIcon} alt="중식" class="category-icon" />`;
      case '일식':
        return `<img src=${japaneseCategoryIcon} alt="일식" class="category-icon" />`;
      case '양식':
        return `<img src=${westernCategoryIcon} alt="양식" class="category-icon" />`;
      case '아시안':
        return `<img src=${asianCategoryIcon} alt="아시안" class="category-icon" />`;
      case '기타':
        return `<img src=${etcCategoryIcon} alt="기타" class="category-icon" />`;
      default:
        return '';
    }
  }

  #convertStringToBoolean(value: string | null): boolean {
    return value === 'true';
  }

  template(): string {
    return `
      <li class="restaurant-list" name="${this.#name}">
        <div class="restaurant-item-img-wrapper">
        ${this.#displayCategoryIcon(this.#category)}
        </div>
        <div class="restaurant-item-content-wrapper">
          <div class="restaurant-item-subtitle-distance-favorite-wrapper">
            <div class="restaurant-item-subtitle-distance-wrapper">
              <h2 class="restaurant__name text-subtitle">${this.#name}</h2>
              <span class="restaurant__distance text-body">캠퍼스부터 ${this.#distance}분 내</span>
            </div>
            <div class="restaurant-item-favorite-icon-wrapper">
              <img src=${
                this.#favorite ? favoriteFilledIcon : favoriteLinedIcon
              } alt="즐겨찾기" class="favorite-icon" />
            </div>
          </div>
          <div class="restaurant-item-discrption-wrapper">
            <p class="restaurant__description text-body">
              ${this.#description !== undefined ? this.#description : ''}
            </p>
          </div>
        </div>
      </li>
      `;
  }
}

export default RestaurantItem;

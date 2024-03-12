import Component from './Component';
import koreanIcon from '../assets/category-korean.png';
import japaneseIcon from '../assets/category-japanese.png';
import chineseIcon from '../assets/category-chinese.png';
import asianIcon from '../assets/category-asian.png';
import westernIcon from '../assets/category-western.png';
import etcIcon from '../assets/category-etc.png';

class CategoryIcon extends Component {
  #category: TCategory;

  constructor() {
    super();
    this.#category = (this.getAttribute('category') as TCategory) || '';
  }

  displayCategoryIcon(category: TCategory) {
    switch (category) {
      case '한식':
        return `<img src=${koreanIcon} alt="한식" class="category-icon" />`;
      case '중식':
        return `<img src=${chineseIcon} alt="중식" class="category-icon" />`;
      case '일식':
        return `<img src=${japaneseIcon} alt="일식" class="category-icon" />`;
      case '양식':
        return `<img src=${westernIcon} alt="양식" class="category-icon" />`;
      case '아시안':
        return `<img src=${asianIcon} alt="아시안" class="category-icon" />`;
      case '기타':
        return `<img src=${etcIcon} alt="기타" class="category-icon" />`;
      default:
        return '';
    }
  }

  template(): string {
    return `
      <div class="restaurant__category">
        ${this.displayCategoryIcon(this.#category)}
      </div>
    `;
  }
}

export default CategoryIcon;

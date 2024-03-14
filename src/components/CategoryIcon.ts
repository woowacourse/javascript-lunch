import Component from './Component';
import koreanIcon from '../assets/category-korean.png';
import japaneseIcon from '../assets/category-japanese.png';
import chineseIcon from '../assets/category-chinese.png';
import asianIcon from '../assets/category-asian.png';
import westernIcon from '../assets/category-western.png';
import etcIcon from '../assets/category-etc.png';

const CATEGORY_ICON = {
  한식: koreanIcon,
  중식: chineseIcon,
  일식: japaneseIcon,
  양식: westernIcon,
  아시안: asianIcon,
  기타: etcIcon,
};

class CategoryIcon extends Component {
  #category: TCategory;

  constructor() {
    super();
    this.#category = (this.getAttribute('category') as TCategory) ?? '';
  }

  template(): string {
    return `
      <figure class="restaurant__category">
        <img src=${CATEGORY_ICON[this.#category]} alt="${this.#category}" class="category-icon" />
      </figure>
    `;
  }
}

export default CategoryIcon;

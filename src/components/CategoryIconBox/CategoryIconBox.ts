import { Category } from '@/types/Restaurant';
import BaseComponent from '../BaseComponent';
import koreanIcon from '@/assets/category-korean.png';
import asianIcon from '@/assets/category-asian.png';
import japaneseIcon from '@/assets/category-japanese.png';
import chineseIcon from '@/assets/category-chinese.png';
import westernIcon from '@/assets/category-western.png';
import etcIcon from '@/assets/category-etc.png';

export const Icons = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class CategoryIconBox extends BaseComponent {
  #category: Category;

  constructor(category: Category) {
    super();
    this.#category = category;
  }

  render() {
    const $imgBox = document.createElement('img');
    $imgBox.setAttribute('src', Icons[this.#category]);
    $imgBox.setAttribute('alt', this.#category);
    $imgBox.classList.add('category-icon');

    this.classList.add('restaurant__category');
    this.append($imgBox);
  }
}

export default CategoryIconBox;

customElements.define('category-icon', CategoryIconBox);

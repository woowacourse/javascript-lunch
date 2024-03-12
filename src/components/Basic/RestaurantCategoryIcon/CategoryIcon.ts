import koreanIcon from '@assets/category-korean.png';
import asianIcon from '@assets/category-asian.png';
import japaneseIcon from '@assets/category-japanese.png';
import chineseIcon from '@assets/category-chinese.png';
import westernIcon from '@assets/category-western.png';
import etcIcon from '@assets/category-etc.png';

import style from './CategoryIcon.module.css';
import { Category } from '@/types/Restaurant';

export const Icons: Record<Category, string> = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class CategoryIcon extends HTMLImageElement {
  constructor(category: Category) {
    super();

    if (!category) {
      category = this.getAttribute('category') as Category;
    }
    this.className = `category-icon ${style.categoryIcon}`;
    this.src = Icons[category];
    this.alt = category;
  }
}

customElements.define('category-icon', CategoryIcon, { extends: 'img' });
export default CategoryIcon;

import koreanIcon from '@assets/category-korean.png';
import asianIcon from '@assets/category-asian.png';
import japaneseIcon from '@assets/category-japanese.png';
import chineseIcon from '@assets/category-chinese.png';
import westernIcon from '@assets/category-western.png';
import etcIcon from '@assets/category-etc.png';

import style from './RestaurantCategoryIcon.module.css';
import { Category } from '@/types/Restaurant';
import CategoryIcon from './CategoryIcon';

export const Icons: Record<Category, string> = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantCategoryIcon extends HTMLDivElement {
  constructor() {
    super();
    this.className = `restaurant__category ${style.restaurant__category}`;

    const category = this.getAttribute('category') as Category;
    this.append(new CategoryIcon(category));
  }
}

customElements.define('restaurant-category-icon', RestaurantCategoryIcon, { extends: 'div' });
export default RestaurantCategoryIcon;

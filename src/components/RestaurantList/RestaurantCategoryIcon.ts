import style from './RestaurantCategoryIcon.module.css';
import { Category } from '@/types/Restaurant';

import koreanIcon from '@assets/category-korean.png';
import asianIcon from '@assets/category-asian.png';
import japaneseIcon from '@assets/category-japanese.png';
import chineseIcon from '@assets/category-chinese.png';
import westernIcon from '@assets/category-western.png';
import etcIcon from '@assets/category-etc.png';

export const Icons: Record<Category, string> = {
  한식: koreanIcon,
  아시안: asianIcon,
  일식: japaneseIcon,
  중식: chineseIcon,
  양식: westernIcon,
  기타: etcIcon,
};

class RestaurantCategoryIcon extends HTMLDivElement {
  $image: HTMLImageElement = document.createElement('img');

  constructor(category: Category, alt?: string) {
    super();

    category = category ?? this.getAttribute('category');
    this.classList.add('restaurant__category', `${style.restaurant__category}`, 'category-icon');
    this.setCategory(category);

    this.$image.alt = alt ?? '';

    this.append(this.$image);
  }

  setCategory(category: Category) {
    this.$image.src = Icons[category];
  }
}

customElements.define('restaurant-category-icon', RestaurantCategoryIcon, { extends: 'div' });

export default RestaurantCategoryIcon;

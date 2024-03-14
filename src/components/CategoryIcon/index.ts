import './style.css';

import AsianIcon from '../../assets/svg/category-asian.svg';
import ChineseIcon from '../../assets/svg/category-chinese.svg';
import EtcIcon from '../../assets/svg/category-etc.svg';
import JapaneseIcon from '../../assets/svg/category-japanese.svg';
import KoreanIcon from '../../assets/svg/category-korean.svg';
import WesternIcon from '../../assets/svg/category-western.svg';

import { CATEGORY } from '../../constants';
import { Category } from '../../types';

type IconMapValue = { imageUrl: string; alt: string };

const iconMap: Map<Category, IconMapValue> = new Map([
  ['asian', { imageUrl: AsianIcon, alt: `${CATEGORY.asian} 아이콘` }],
  ['chinese', { imageUrl: ChineseIcon, alt: `${CATEGORY.chinese} 아이콘` }],
  ['etc', { imageUrl: EtcIcon, alt: `${CATEGORY.etc} 아이콘` }],
  ['korean', { imageUrl: KoreanIcon, alt: `${CATEGORY.korean} 아이콘` }],
  ['japanese', { imageUrl: JapaneseIcon, alt: `${CATEGORY.japanese} 아이콘` }],
  ['western', { imageUrl: WesternIcon, alt: `${CATEGORY.western} 아이콘` }],
]);

class CategoryIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const category = this.getAttribute('category');

    if (category && Object.keys(CATEGORY).includes(category)) {
      const item = iconMap.get(category as Category);

      const { imageUrl, alt } = item as IconMapValue;
      const $img =document.createElement('img');
      $img.src = imageUrl;
      $img.alt =alt;

      this.appendChild($img);
    }
  }
}

customElements.define('category-icon', CategoryIcon);

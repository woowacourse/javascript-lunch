import './style.css';
import { Category } from '../../types';
import AsianIcon from '../../assets/svg/category-asian.svg';
import ChineseIcon from '../../assets/svg/category-chinese.svg';
import EtcIcon from '../../assets/svg/category-etc.svg';
import JapaneseIcon from '../../assets/svg/category-japanese.svg';
import KoreanIcon from '../../assets/svg/category-korean.svg';
import WesternIcon from '../../assets/svg/category-western.svg';

const iconMap: Map<Category, { imageUrl: string; alt: string }> = new Map([
  ['asian', { imageUrl: AsianIcon, alt: '아시안 아이콘' }],
  ['chinese', { imageUrl: ChineseIcon, alt: '중식 아이콘' }],
  ['etc', { imageUrl: EtcIcon, alt: '기타 아이콘' }],
  ['korean', { imageUrl: KoreanIcon, alt: '한식 아이콘' }],
  ['western', { imageUrl: WesternIcon, alt: '양식 아이콘' }],
  ['japanese', { imageUrl: JapaneseIcon, alt: '일식 아이콘' }],
]);

class CategoryIcon extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const category = this.getAttribute('category') as Category;
    const item = iconMap.get(category);

    if (item) {
      const { imageUrl, alt } = item;

      this.innerHTML = /*html*/ `          
        <img src="${imageUrl}" alt="${alt}" />         
      `;
    }
  }
}
customElements.define('category-icon', CategoryIcon);

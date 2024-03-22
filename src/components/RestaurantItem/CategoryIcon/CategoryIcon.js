import './CategoryIcon.css';

import koreanIcon from '../../../statics/imgs/category-korean.png';
import chineseIcon from '../../../statics/imgs/category-chinese.png';
import japaneseIcon from '../../../statics/imgs/category-japanese.png';
import westernIcon from '../../../statics/imgs/category-western.png';
import asianIcon from '../../../statics/imgs/category-asian.png';
import etcIcon from '../../../statics/imgs/category-etc.png';

const CATEGORY_ICONS = {
  한식: koreanIcon,
  중식: chineseIcon,
  일식: japaneseIcon,
  양식: westernIcon,
  아시안: asianIcon,
  기타: etcIcon,
};

export default class CategoryIcon extends HTMLImageElement {
  #category;

  constructor(category) {
    super();
    this.#category = category;
    this.classList.add('.category-icon');
    this.#render();
  }

  #render() {
    this.src = CATEGORY_ICONS[this.#category];
    this.alt = this.#category;
  }
}

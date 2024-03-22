import './CategoryIcon.css';

import koreanIcon from '../../../statics/imgs/category-korean.png';
import chineseIcon from '../../../statics/imgs/category-chinese.png';
import japaneseIcon from '../../../statics/imgs/category-japanese.png';
import westernIcon from '../../../statics/imgs/category-western.png';
import asianIcon from '../../../statics/imgs/category-asian.png';
import etcIcon from '../../../statics/imgs/category-etc.png';

export default class CategoryIcon extends HTMLImageElement {
  #category;

  constructor(category) {
    super();
    this.#category = category;
    this.classList.add('.category-icon');
    this.#render();
  }

  #render() {
    this.src = this.#getCategoryIconUrl();
    this.alt = this.#category;
  }

  #getCategoryIconUrl() {
    if (this.#category === '한식') return koreanIcon;
    if (this.#category === '중식') return chineseIcon;
    if (this.#category === '일식') return japaneseIcon;
    if (this.#category === '양식') return westernIcon;
    if (this.#category === '아시안') return asianIcon;
    if (this.#category === '기타') return etcIcon;
    return '';
  }
}

import $template from './index.html';
import { Category } from '../../types';
import { imgSrc } from '../../image';
import { $ } from '../../utils/dom';

class RestaurantItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = $template
      .replace('{src}', imgSrc[this.getAttribute('category') as Category])
      .replace('{category}', this.getAttribute('category')!)
      .replace('{name}', this.getAttribute('name')!)
      .replace('{distance}', this.getAttribute('distance')!)
      .replace('{description}', this.getAttribute('description')!);

    const favorite = this.getAttribute('favorite');
    const $wrapper = $<HTMLDivElement>('.description__wrapper', this);
    $wrapper?.insertAdjacentHTML(
      'beforeend',
      `<favorite-icon favorite=${favorite}></favorite-icon>`,
    );
  }
}

export default RestaurantItem;

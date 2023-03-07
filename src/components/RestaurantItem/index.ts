import { Category } from '../../types';
import $template from './index.html';
import { imgSrc } from '../../image';
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
  }
}

export default RestaurantItem;

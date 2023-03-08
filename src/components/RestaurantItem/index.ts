import $template from './index.html';
import DetailBottomSheet from '../DetailBottomSheet';
import { Category, Distance } from '../../types';
import { imgSrc } from '../../image';
import { $ } from '../../utils/dom';

class RestaurantItem extends HTMLElement {
  connectedCallback() {
    this.render();

    this.addEventListener('click', () => {
      const $detailBottomSheet = $<DetailBottomSheet>('detail-bottom-sheet');

      const restaurant = {
        category: this.getAttribute('category')! as Category,
        name: this.getAttribute('name')!,
        distance: this.getAttribute('distance')! as unknown as Distance,
        description: this.getAttribute('description')!,
      };

      $detailBottomSheet.render(restaurant);
      $detailBottomSheet.toggle();
    });
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

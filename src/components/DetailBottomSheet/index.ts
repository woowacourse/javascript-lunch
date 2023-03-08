import $template from './index.html';
import { imgSrc } from '../../image';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';

class DetailBottomSheet extends HTMLElement {
  toggle() {
    const $detailBottomSheet = $<DetailBottomSheet>('.bottom-sheet');
    $detailBottomSheet?.classList.toggle('bottom-sheet--open');
  }

  render(restaurant: Restaurant) {
    const { category, name, distance, description } = restaurant;
    this.innerHTML = $template
      .replace('{src}', imgSrc[category])
      .replace('{name}', name)
      .replace('{distance}', String(distance))
      .replace('{description}', String(description));
  }
}

export default DetailBottomSheet;

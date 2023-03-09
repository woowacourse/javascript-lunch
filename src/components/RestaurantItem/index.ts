import { imgSrc } from '../../constants/image';
import { Category } from '../../types';
import $template from './index.html';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    // detail-modal 열기
    this.addEventListener('click', (e) => {
      const $detailModal = document.createElement('detail-modal');

      $detailModal?.setAttribute('id', this.getAttribute('id')!);
      $detailModal?.setAttribute('src', imgSrc[this.getAttribute('category') as Category]);
      $detailModal?.setAttribute('category', this.getAttribute('category')!);
      $detailModal?.setAttribute('name', this.getAttribute('name')!);
      $detailModal?.setAttribute('distance', this.getAttribute('distance')!);
      $detailModal?.setAttribute('description', this.getAttribute('description')!);
      $detailModal?.setAttribute('link', this.getAttribute('link')!);
      document.body.insertAdjacentElement('beforeend', $detailModal);
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

import $template from './index.html';
import { imgSrc } from '../../image';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';

class DetailBottomSheet extends HTMLElement {
  connectedCallback() {
    this.innerHTML = $template;
  }

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

    const $cancelButton = $<HTMLButtonElement>('#cancel-button', this);
    $cancelButton.addEventListener('click', () => this.toggle());
  }

  addDeleteHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      if (e.target.id !== 'delete-button') return;
      const target = this.querySelector('.restaurant__name');
      handler(target?.textContent);
      this.toggle();
    });
  }
}

export default DetailBottomSheet;

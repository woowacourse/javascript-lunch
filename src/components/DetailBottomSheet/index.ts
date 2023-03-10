import $template from './index.html';
import { imgSrc } from '../../image';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';
import FavoriteIcon from '../FavoriteIcon';

class DetailBottomSheet extends HTMLElement {
  connectedCallback() {
    this.innerHTML = $template;
  }

  toggle() {
    const $detailBottomSheet = $<DetailBottomSheet>('.bottom-sheet');
    $detailBottomSheet?.classList.toggle('bottom-sheet--open');
  }

  render(restaurant: Restaurant) {
    const { category, name, distance, description, link, favorite } = restaurant;
    this.innerHTML = $template
      .replace('{src}', imgSrc[category])
      .replace('{name}', name)
      .replace('{distance}', String(distance))
      .replace('{description}', String(description))
      .replaceAll('{link}', link || '');

    const $cancelButton = $<HTMLButtonElement>('#cancel-button', this);
    $cancelButton.addEventListener('click', () => this.toggle());
    const $wrapper = this.querySelector('.img__wrapper');
    const isFavorite = String(favorite) === 'true';
    $wrapper?.insertAdjacentHTML('beforeend', new FavoriteIcon().render(isFavorite));
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

import $template from './index.html';
import { imgSrc } from '../../image';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';

class DetailBottomSheet extends HTMLElement {
  isFavorite: boolean;

  constructor() {
    super();
    this.isFavorite = false;
  }

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
    this.isFavorite = String(favorite) === 'true';
    this.toggleFavoriteAttribute();
  }

  addDeleteHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      if (e.target.id !== 'delete-button') return;
      const target = this.querySelector('.restaurant__name');
      handler(target?.textContent);
      this.toggle();
    });
  }

  addFavoriteButtonHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      if (e.target.className !== 'favorite-icon') return;
      const target = this.querySelector('.restaurant__name');
      const name = target?.textContent;
      this.isFavorite = !this.isFavorite;
      this.toggleFavoriteAttribute();
      handler(name);
    });
  }

  toggleFavoriteAttribute() {
    const $wrapper = this.querySelector('.img__wrapper');
    $wrapper!.lastChild?.remove();
    $wrapper!.insertAdjacentHTML(
      'beforeend',
      `<favorite-icon favorite=${this.isFavorite}></favorite-icon>`,
    );
  }
}

export default DetailBottomSheet;

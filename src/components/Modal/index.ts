import $template from './index.html';
import { Category, Distance } from '../../types';
import store from '../../store';
import { $, $$ } from '../../utils/dom';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = $template;
  }

  toggleModal() {
    const modal = $<HTMLDivElement>('.modal');
    modal.classList.add('modal--open');
  }

  connectedCallback() {
    this.render();
    const $modal = $<HTMLDivElement>('.modal');

    const $cancelButton = $<HTMLButtonElement>('#cancel-button');
    $cancelButton.addEventListener('click', () => {
      $modal.classList.remove('modal--open');
    });

    const $form = $$<HTMLFormElement>('add-restaurant');
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      const $category = $$<HTMLSelectElement>('category');
      const $name = $$<HTMLInputElement>('name');
      const $distance = $$<HTMLSelectElement>('distance');
      const $description = $$<HTMLTextAreaElement>('description');
      const $link = $$<HTMLInputElement>('link');

      store.addRestaurants({
        category: $category.value as Category,
        name: $name.value,
        distance: Number($distance.value) as Distance,
        description: `"${$description.value}"`,
        link: $link.value,
      });

      $modal.classList.remove('modal--open');
      $category.value = '';
      $name.value = '';
      $distance.value = '';
      $description.value = '';
      $link.value = '';
    });
  }
}

export default Modal;

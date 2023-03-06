import store from '../../store';
import { Category, Distance } from '../../types';
import $template from './index.html';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = $template;
  }

  connectedCallback() {
    this.render();
    const $modal = this.querySelector('.modal');

    const $cancelButton = this.querySelector('#cancel-button');
    $cancelButton?.addEventListener('click', () => {
      $modal?.classList.remove('modal--open');
    });

    const $form = this.querySelector('#add-restaurant');
    $form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const $category = this.querySelector('#category') as HTMLSelectElement;
      const $name = this.querySelector('#name') as HTMLInputElement;
      const $distance = this.querySelector('#distance') as HTMLSelectElement;
      const $description = this.querySelector('#description') as HTMLTextAreaElement;
      const $link = this.querySelector('#link') as HTMLInputElement;

      store.addRestaurants({
        category: $category.value as Category,
        name: $name.value,
        distance: Number($distance.value) as Distance,
        description: `"${$description.value}"`,
        link: $link.value,
      });

      $modal?.classList.remove('modal--open');
      $category.value = '';
      $name.value = '';
      $distance.value = '';
      $description.value = '';
      $link.value = '';
    });
  }
}

export default Modal;

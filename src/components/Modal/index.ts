import $template from './index.html';
import { Category, Distance } from '../../types';
import store from '../../store';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = $template;
  }

  connectedCallback() {
    this.render();
    const $modal = document.querySelector('.modal');

    const $cancelButton = document.querySelector('#cancel-button');
    $cancelButton?.addEventListener('click', () => {
      $modal?.classList.remove('modal--open');
    });

    const $form = document.getElementById('add-restaurant');
    $form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const $category = document.getElementById('category') as HTMLSelectElement;
      const $name = document.getElementById('name') as HTMLInputElement;
      const $distance = document.getElementById('distance') as HTMLSelectElement;
      const $description = document.getElementById('description') as HTMLTextAreaElement;
      const $link = document.getElementById('link') as HTMLInputElement;

      store.addRestaurants({
        category: $category.value as Category,
        name: $name.value,
        distance: Number($distance.value) as Distance,
        description: `"${$description.value}"`,
        link: $link.value,
      });
      $modal?.classList.remove('modal--open');
    });
  }
}

export default Modal;

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

  toggleModal() {
    const modal = this.querySelector('.modal');
    modal?.classList.add('modal--open');
  }

  connectedCallback() {
    this.render();
    const $modal = this.querySelector('.modal');

    const $cancelButton = this.querySelector('#cancel-button');
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
      $category.value = '';
      $name.value = '';
      $distance.value = '';
      $description.value = '';
      $link.value = '';
    });
  }
}

export default Modal;

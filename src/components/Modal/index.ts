import $template from './index.html';
import { Category, Distance } from '../../types';
import store from '../../store';
import { $, $$ } from '../../utils/dom';

class Modal extends HTMLElement {
  $modal: HTMLDivElement | null;
  constructor() {
    super();
    this.$modal = null;
  }

  openModal() {
    this.$modal?.classList.add('modal--open');
  }

  closeModal($form: HTMLFormElement) {
    $form.reset();
    this.$modal?.classList.remove('modal--open');
  }

  render() {
    this.innerHTML = $template;
    this.$modal = $<HTMLDivElement>('.modal');
  }

  connectedCallback() {
    this.render();

    const $cancelButton = $<HTMLButtonElement>('#cancel-button');
    const $form = $$<HTMLFormElement>('add-restaurant');

    $cancelButton.addEventListener('click', () => {
      this.closeModal($form);
    });

    $form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      const $category = $$<HTMLSelectElement>('category');
      const $name = $$<HTMLInputElement>('name');
      const $distance = $$<HTMLSelectElement>('distance');
      const $description = $$<HTMLTextAreaElement>('description');
      const $link = $$<HTMLInputElement>('link');

      const restaurant = {
        category: $category.value as Category,
        name: $name.value,
        distance: Number($distance.value) as Distance,
        description: `"${$description.value}"`,
        link: $link.value,
      };
      store.addRestaurants(restaurant);
      this.closeModal($form);
    });
  }
}

export default Modal;

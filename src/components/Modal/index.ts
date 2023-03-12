import $template from './index.html';
import { Category, Distance } from '../../types';
import { $ } from '../../utils/dom';
import { v4 as uuidv4 } from 'uuid';

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
    this.$modal = $<HTMLDivElement>('.modal', this);
  }

  connectedCallback() {
    this.render();
  }

  addRestaurantHandler(restaurantHandler: CallableFunction) {
    const $cancelButton = $<HTMLButtonElement>('#cancel-button', this);
    $cancelButton.addEventListener('click', () => {
      this.closeModal($form);
    });

    const $form = $<HTMLFormElement>('#add-restaurant');
    $form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      const $category = $<HTMLSelectElement>('#category', this);
      const $name = $<HTMLInputElement>('#name', this);
      const $distance = $<HTMLSelectElement>('#distance', this);
      const $description = $<HTMLTextAreaElement>('#description', this);
      const $link = $<HTMLInputElement>('#link', this);
      const restaurant = {
        id: uuidv4(),
        category: $category.value as Category,
        name: `"${$name.value}"`,
        distance: Number($distance.value) as Distance,
        description: `"${$description.value}"`,
        link: $link.value,
        favorite: false,
      };
      restaurantHandler(restaurant);
      this.closeModal($form);
    });
  }
}

export default Modal;

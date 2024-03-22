import BasicModal from '../Basic/BasicModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { IRestaurant, DistanceOrPlaceholder, Category, DistanceNumeric } from '@/types/Restaurant';

import './NewRestaurantModal.css';
import AllRestaurantApp from '../AllRestaurantApp';
import { dom } from '@/util/dom';
import NewRestaurantForm from './NewRestaurantForm';

class NewRestaurantModal extends BasicModal {
  #title: HTMLHeadingElement;
  #form: NewRestaurantForm;

  constructor() {
    super();

    const template = document.createElement('div');
    template.innerHTML = `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form is="new-restaurant-form" class="new-restaurant-form"></form>
    `;

    this.#title = template.querySelector('.modal-title')!;
    this.#form = template.querySelector('.new-restaurant-form')!;
    this.appendAll([this.#title, this.#form]);

    this.#setSubmitEvent();
  }

  closeModal() {
    this.#form.invisibleErrorMessage();
    this.classList.remove('modal--open');
  }

  #setSubmitEvent() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#form.invisibleErrorMessage();
      const { name, distance, category, description, link } = this.#form.getValues();
      if (this.#form.validateRequiredValues(category, distance, name)) return;

      const distanceNumeric = distance as DistanceNumeric;
      const categoryOnly = category as Category;
      const newRestaurant: IRestaurant = {
        name,
        distance: distanceNumeric,
        category: categoryOnly,
        ...(description && { description }),
        ...(link && { link }),
      };
      new RestaurantDBService().add(newRestaurant);

      this.#rerenderApp();
      this.closeModal();
    });
  }

  #rerenderApp() {
    dom.getElement<AllRestaurantApp>(document.body, '[is="all-restaurant-app"]').render();
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurant-modal', NewRestaurantModal, { extends: 'div' });

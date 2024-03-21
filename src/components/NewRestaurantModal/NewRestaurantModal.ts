import BasicModal from '../Basic/BasicModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { IRestaurant, DistanceOrPlaceholder, Category, DistanceNumeric } from '@/types/Restaurant';

import './NewRestaurantModal.css';
import AllRestaurantApp from '../AllRestaurantApp';
import { dom } from '@/util/dom';

class NewRestaurantModal extends BasicModal {
  #title: HTMLHeadingElement;
  #form: HTMLFormElement;

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
    this.#invisibleErrorMessage();
    this.classList.remove('modal--open');
  }

  getForm() {
    return this.#form;
  }

  #invisibleErrorMessage() {
    dom.getElement<HTMLElement>(this, '.category-select > .error').classList.add('invisible');
    dom.getElement<HTMLElement>(this, '.distance-select > .error').classList.add('invisible');
    dom.getElement<HTMLElement>(this, '.name-input-box > .error').classList.add('invisible');
  }

  #setSubmitEvent() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#invisibleErrorMessage();
      const { name, distance, category, description, link } = this.#getValues();
      if (this.#validateRequiredValues(category, distance, name)) return;

      const distanceNumeric = distance as DistanceNumeric;
      const categoryOnly = category as Category;
      const newRestaurant: IRestaurant = {
        name,
        distance: distanceNumeric,
        category: categoryOnly,
        ...(description && { description }),
        ...(link && { link }),
      };
      const DBService = new RestaurantDBService();
      DBService.add(newRestaurant);

      this.#rerenderApp();
      this.closeModal();
    });
  }

  #getValues(): {
    name: string;
    distance: number;
    category: string;
    description: string;
    link: string;
  } {
    const name: string = (this.#form.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number(
      (this.#form.elements.namedItem('distance') as HTMLSelectElement)
        .value as DistanceOrPlaceholder,
    );

    const category = (this.#form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;
    return { name, distance, category, description, link };
  }

  #validateRequiredValues(category: string, distance: number, name: string | null) {
    const isNotValidCategory = category === '선택해주세요';
    const isNotValidDistance = Number.isNaN(distance);
    const isNotValidName = !name;
    if (isNotValidCategory) {
      dom.getElement(this, '.category-select > .error').classList.remove('invisible');
    }
    if (isNotValidDistance) {
      dom.getElement(this, '.distance-select > .error').classList.remove('invisible');
    }
    if (isNotValidName) {
      dom.getElement(this, '.name-input-box > .error').classList.remove('invisible');
    }
    return isNotValidCategory || isNotValidDistance || isNotValidName;
  }

  #rerenderApp() {
    (this.parentElement as AllRestaurantApp).render();
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurant-modal', NewRestaurantModal, { extends: 'div' });

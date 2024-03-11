import BasicModal from '../BasicModal/BasicModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, Distance, IRestaurant } from '@/types/Restaurant';
import { checkAllValuesValid, validateAllValuesAndMakeErrorMessage } from '@/utils/validator';
import { closeModal, hideErrorMessage } from '@/utils/view';
import NewRestaurantModalView from './NewRestaurantModalView';
import { ErrorMessage } from '@/constants/Message';
import { $ } from '@/utils/DOM';

class NewRestaurantModal extends NewRestaurantModalView {
  #form;
  #title;
  #restaurantDBService;

  constructor() {
    super();
    this.#form = document.createElement('form');
    this.#title = document.createElement('h2');
    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
    this.#restaurantDBService = new RestaurantDBService();
  }

  render() {
    super.makeForm(this.#form);
    this.#submitForm();
    closeModal(this);

    const $fragment = new DocumentFragment();
    $fragment.append(this.#title);
    $fragment.append(this.#form);
    this.append(new BasicModal($fragment));
  }

  #submitForm() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      hideErrorMessage();

      const { category, name, distance, description, link } = this.#getValues();

      validateAllValuesAndMakeErrorMessage({ category, distance, name, link });
      if (!checkAllValuesValid({ category, distance, name, link })) return;

      const newRestaurant: IRestaurant = {
        name,
        distance: distance as Distance,
        category: category as Category,
        ...(description && { description }),
        ...(link && { link }),
      };

      this.#restaurantDBService.add(newRestaurant);
      this.#rerenderByFilter();
      closeModal(this);
      this.#form.reset();
    });
  }

  #getValues() {
    const name = (this.#form.elements.namedItem('name') as HTMLInputElement).value;
    console.log('name', name);
    const distance = Number((this.#form.elements.namedItem('distance') as HTMLSelectElement).value);
    const category = (this.#form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;

    return { name, distance, category, description, link };
  }

  #rerenderByFilter() {
    const $selectElement = $('.restaurant-filter-container');
    if (!$selectElement) {
      return console.error(ErrorMessage.NULL_SELECTOR($selectElement));
    }
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $selectElement.dispatchEvent(event);
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);

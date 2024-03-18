import { ERROR } from '../constants/messages';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $addEvent, $removeEvent } from '../utils/dom';
import { isEmptyInput } from '../utils/validation';
import Component from './Component';
import RestaurantAddForm from './RestaurantAddForm';
import RestaurantDetail from './RestaurantDetail';

class LunchPickerModal extends Component {
  static observedAttributes: string[] = ['type', 'open'];
  #type: string | null;
  #open: boolean;

  constructor() {
    super();
    this.#type = this.getAttribute('type');
    this.#open = this.#convertStringToBoolean(this.getAttribute('open'));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'type' || name === 'open') {
      this.#type = newValue;
      const restaurantName = this.getAttribute('restaurantName');
      if (this.#type === 'detail' && restaurantName) {
        const restaurant = this.#handleRestaurantDetail(restaurantName);
        this.render(restaurant);
      }
      if (this.#type === 'add') {
        this.render();
      }
      this.#open = this.#convertStringToBoolean(newValue);
      this.#updateModal(this.#open);
    }
    this.setEvent();
  }

  setEvent(): void {
    $addEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $addEvent('.button-cancel', 'click', this.#handleOnCancel.bind(this));
    const deleteButton = this.querySelector('.button-delete');
    const favoriteIcon = this.querySelector('.detail-favorite-icon');
    deleteButton?.addEventListener('click', this.#handleDeleteClick.bind(this));
    favoriteIcon?.addEventListener('click', this.#handleFavoriteClick.bind(this));
  }

  removeEvent(): void {
    $removeEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $removeEvent('.button-cancel', 'click', this.#handleOnCancel.bind(this));
  }

  #convertStringToBoolean(value: string | null): boolean {
    return value === 'true';
  }

  #updateModal(isOpen: boolean): void {
    if (isOpen) {
      ($('.modal') as HTMLElement).classList.add('modal--open');
    } else {
      ($('.modal') as HTMLElement).classList.remove('modal--open');
    }
  }

  #handleRestaurantDetail(restaurantName: string) {
    const restaurant = RestaurantRepository.getByDetailItem(restaurantName);
    return restaurant;
  }

  #handleOnSubmit(event: Event): void {
    event.preventDefault();
    if (this.#handleEmptyError(['.modal-category', '.modal-restaurant-name', '.modal-distance'])) {
      return;
    }

    const formData = {
      category: ($('.modalCategory') as HTMLFormElement).value,
      name: ($('.modal-restaurant-name') as HTMLFormElement).value,
      distance: ($('.modalDistance') as HTMLFormElement).value,
      description: ($('.modal-description') as HTMLFormElement).value,
      reference: ($('.modal-reference') as HTMLFormElement).value,
      favorite: false,
    };
    this.makeCustomEvent('submitButtonClick', formData);
    this.#updateModal(false);
  }

  #handleOnCancel(): void {
    this.makeCustomEvent('cancelButtonClick');
  }

  #handleEmptyError(selectors: string[]): boolean {
    const errors = selectors.filter((selector: string) => {
      if (isEmptyInput(($(selector) as HTMLSelectElement).value)) {
        ($(`${selector}-error-message`) as HTMLElement).textContent = ERROR.NULL;
        return true;
      }

      ($(`${selector}-error-message`) as HTMLElement).textContent = '';
      return false;
    });

    if (!errors.length) {
      return false;
    }

    ($(errors[0]) as HTMLElement).focus();
    return true;
  }

  #handleDeleteClick(event: Event) {
    const target = event.target as HTMLElement;
    const restaurantName = target?.parentNode?.parentNode?.children[0].children[1]?.firstChild?.nodeValue as string;
    this.dispatchEvent(new CustomEvent('deleteButtonClick', { bubbles: true, detail: restaurantName }));
    this.#open = false;
  }

  #handleFavoriteClick(event: Event) {
    const target = event.target as HTMLElement;
    const restaurantName = target?.parentNode?.parentNode?.children[1].innerHTML as string;
    this.dispatchEvent(new CustomEvent('detailFavoriteButtonClick', { bubbles: true, detail: restaurantName }));
  }

  render(restaurant?: IRestaurant): void {
    this.innerHTML = this.template(restaurant);
  }

  template(restaurant?: IRestaurant): string {
    const modalHtml = [];
    if (this.#type === 'add') {
      modalHtml.push(RestaurantAddForm());
    }

    if (this.#type === 'detail' && restaurant) {
      modalHtml.push(RestaurantDetail(restaurant));
    }

    return `
    <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${modalHtml.join('')}
        </div>
    </div>
    `;
  }
}

export default LunchPickerModal;

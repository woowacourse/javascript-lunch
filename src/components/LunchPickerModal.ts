import { ERROR } from '../constants/messages';
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
    this.render();
    if (name === 'type') {
      this.#type = newValue;
    }
    if (name === 'open') {
      this.#open = this.#convertStringToBoolean(newValue);
      this.#updateModal(this.#open);
    }
    this.setEvent();
  }

  setEvent(): void {
    $addEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $addEvent('.button--secondary', 'click', this.#handleOnCancel.bind(this));
  }

  removeEvent(): void {
    $removeEvent('.modal-form', 'submit', this.#handleOnSubmit.bind(this));
    $removeEvent('.button--secondary', 'click', this.#handleOnCancel.bind(this));
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

  template(): string {
    const modalHtml = [];

    if (this.#type === 'add') {
      modalHtml.push(RestaurantAddForm());
    }

    if (this.#type === 'detail') {
      //modalHtml.push(RestaurantDetail());
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

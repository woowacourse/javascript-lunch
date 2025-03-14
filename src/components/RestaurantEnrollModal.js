import { CATEGORY_KEY } from '../../public/restaurantData.js';
import createElement from '../utils/createElement.js';
import RestaurantValidator from '../validators/RestaurantValidator.js';
import Modal from './common/Modal.js';
import createRestaurantEnrollForm from './RestaurantEnrollForm.js';
import { addRestaurantList } from './RestaurantList.js';

class RestaurantEnrollModal {
  #restaurantInput;
  #enrollModal;
  #onAdd;

  constructor(onAdd) {
    this.#restaurantInput = {
      name: null,
      category: null,
      distance: null,
      description: null,
      link: null,
    };

    this.#enrollModal = new Modal();
    this.initModalContent();
    this.#onAdd = onAdd;
  }

  initModalContent() {
    const $modalTitle = createElement({
      tag: 'h2',
      className: 'modal-title text-title',
      textContent: '새로운 음식점',
    });

    const $enrollForm = createRestaurantEnrollForm(
      this.#restaurantInput,
      (event) => this.handleSubmit(event),
      () => this.handleCancel()
    );

    const fragment = new DocumentFragment();
    fragment.append($modalTitle, $enrollForm);
    this.#enrollModal.appendModalContent(fragment);
  }

  handleSubmit(event) {
    const isValidate = RestaurantValidator.validate(this.#restaurantInput);
    if (!isValidate) return;

    this.#onAdd(this.#restaurantInput);
  }

  handleCancel() {
    this.#enrollModal.toggle();
  }

  handleClose() {
    document.querySelector('select#category').value = '';
    document.querySelector('input#name').value = '';
    document.querySelector('select#distance').value = '';
    document.querySelector('textarea#description').value = '';
    document.querySelector('input#link').value = '';

    Object.keys(this.#restaurantInput).forEach((key) => {
      this.#restaurantInput[key] = null;
    });
  }

  get modal() {
    return this.#enrollModal;
  }
}

export default RestaurantEnrollModal;

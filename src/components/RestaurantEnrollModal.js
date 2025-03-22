import createElement from '../utils/createElement.js';
import RestaurantValidator from '../validators/RestaurantValidator.ts';
import Modal from './common/Modal.js';
import createRestaurantEnrollForm from './RestaurantEnrollForm.js';

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

    this.#enrollModal = new Modal(this.handleClose);
    this.initModalContent();
    this.#onAdd = onAdd;
  }

  initModalContent() {
    const $modalTitle = createElement({
      tag: 'h2',
      className: 'modal-title text-title',
      textContent: '새로운 음식점',
    });

    const $enrollForm = createRestaurantEnrollForm({
      restaurantInput: this.#restaurantInput,
      onEnroll: (event) => this.handleSubmit(event),
      onCancel: () => this.handleCancel(),
    });

    const fragment = new DocumentFragment();
    fragment.append($modalTitle, $enrollForm);
    this.#enrollModal.appendModalContent(fragment);
  }

  handleSubmit() {
    const isValidate = RestaurantValidator.validate(this.#restaurantInput);
    if (!isValidate) return;

    this.#restaurantInput.id = Date.now();
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
  }

  get modal() {
    return this.#enrollModal;
  }
}

export default RestaurantEnrollModal;

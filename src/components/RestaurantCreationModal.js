import Modal from './Modal';
import generateRestaurantCreationModal from './template/generateRestaurantCreationModal';

import tryCatchWrapper from '../utils/tryCatchWrapper';
import { $ } from '../utils/dom';
import { validateRequiredValue, validateRestaurantsName } from '../validators/ValidateInput';
import { FIELD_IDS } from '../constants/rules';

class RestaurantCreationModal extends Modal {
  #restaurantsInstance;

  constructor({ targetId, restaurantsInstance }) {
    super({ targetId });
    this.#restaurantsInstance = restaurantsInstance;

    this.#initEventListeners();
  }

  render() {
    super.render(generateRestaurantCreationModal());
  }

  #initEventListeners() {
    this.element.addEventListener('focusout', this.#handleRequiredInput.bind(this));
    this.element.addEventListener('click', this.#handleModalClose.bind(this));
    this.element.addEventListener('submit', this.#handleAddRestaurant.bind(this));
  }

  #handleRequiredInput(event) {
    const targetId = event.target.id;

    if (FIELD_IDS.requiredIds.some((requiredId) => requiredId === targetId)) {
      tryCatchWrapper({
        tryBlock: () => this.#validateRequiredInput(targetId),
        catchBlock: ({ message }) => ($(`${targetId}-error`).innerText = message),
      });
    }
  }

  #handleModalClose(event) {
    const targetId = event.target.id;

    if (targetId === 'cancel-button' || targetId === 'restaurant-creation-modal-backdrop') {
      this.closeModal();
    }
  }

  #handleAddRestaurant(event) {
    event.preventDefault();

    if (event.submitter.id === 'add-button') {
      tryCatchWrapper({
        tryBlock: () => this.#addRestaurant(event),
        catchBlock: ({ message }) => alert(message),
      });
    }
  }

  #addRestaurant(event) {
    const inputData = this.#getInputData(event);

    this.#validateUniqueName(inputData);
    this.#restaurantsInstance.addRestaurant(inputData);
    $('restaurant-input-form').reset();
    this.closeModal();
  }

  #validateUniqueName(inputData) {
    const restaurantNames = this.#restaurantsInstance.storageData.map(
      (restaurant) => restaurant.name,
    );
    validateRestaurantsName({ restaurantNames, name: inputData.name });
  }

  #validateRequiredInput(id) {
    validateRequiredValue(id, $(id).value);
    $(`${id}-error`).innerText = '';
  }

  #getInputData(event) {
    const form = event.target;

    const category = form['category'].value;
    const name = form['name'].value;
    const walkingTimeFromCampus = form['distance'].value;
    const description = form['description'].value;
    const link = form['link'].value;
    return { category, name, walkingTimeFromCampus, description, link };
  }
}

export default RestaurantCreationModal;

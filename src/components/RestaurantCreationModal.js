import generateRestaurantCreationModal from './template/generateRestaurantCreationModal';

import tryCatchWrapper from '../utils/tryCatchWrapper';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modalHandler';

import { validateRequiredValue, validateRestaurantsName } from '../validators';
import { FIELD_IDS } from '../constants/rules';

class RestaurantCreationModal {
  #element;
  #restaurants;

  constructor({ targetId, restaurants }) {
    this.#element = $(targetId);
    this.#restaurants = restaurants;

    this.#initEventListeners();
  }

  render() {
    this.#element.innerHTML = generateRestaurantCreationModal();
  }

  #initEventListeners() {
    this.#element.addEventListener('focusout', this.#handleRequiredInput.bind(this));
    this.#element.addEventListener('click', this.#handleModalClose.bind(this));
    this.#element.addEventListener('submit', this.#handleAddRestaurant.bind(this));
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

    if (targetId === 'cancel-button' || targetId === 'modal-backdrop') {
      closeModal($('restaurant-creation-modal'));
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
    this.#restaurants.addRestaurant(inputData);
    $('restaurant-input-form').reset();
    closeModal($('restaurant-creation-modal'));
  }

  #validateUniqueName(inputData) {
    const restaurantNames = this.#restaurants.storageData.map((restaurant) => restaurant.name);
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

    return { category, name, walkingTimeFromCampus, description };
  }
}

export default RestaurantCreationModal;

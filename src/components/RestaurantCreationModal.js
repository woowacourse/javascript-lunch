import generateRestaurantItem from './template/generateRestaurantItem';

import { validateRequiredValue, validateRestaurantsName } from '../validators';
import tryCatchWrapper from '../utils/tryCatchWrapper';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modalHandler';

import { FIELD_IDS } from '../constants/rules';
import generateRestaurantCreationModal from './template/generateRestaurantCreationModal';

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
    const modal = $('restaurant-creation-modal');

    modal.addEventListener('focusout', this.#handleRequiredInput.bind(this));
    modal.addEventListener('click', this.#handleModalClose.bind(this));
    modal.addEventListener('submit', this.#handleAddRestaurant.bind(this));
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
    this.#insertRestaurantList(inputData);

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

  #insertRestaurantList(inputData) {
    $('restaurant-list').insertAdjacentHTML('afterbegin', generateRestaurantItem(inputData));
    $('restaurant-input-form').reset();
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

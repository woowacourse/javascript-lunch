import { $ } from '../utils/dom';
import generateModal from './template/generateModal';
import generateRestaurantItem from './template/generateRestaurantItem';

class RestaurantDetailModal {
  #element;
  #restaurants;

  constructor({ targetId, restaurants }) {
    this.#element = $(targetId);
    this.#restaurants = restaurants;

    this.#initEventListeners();
  }

  render() {
    generateModal(this.#element, generateRestaurantItem(this.#restaurants.standardList[0]));
  }

  #initEventListeners() {}
}

export default RestaurantDetailModal;

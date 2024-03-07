import { FORM_INPUT_QUERY } from '../constant/config';
import RestaurantService from '../domain/RestaurantService';
import { $ } from '../utils/querySelector';
import OutputView from '../views/OutputView';

class RestaurantController {
  #restaurantList;

  #category;

  #property;

  constructor() {
    this.#restaurantList = this.getRecentData();

    this.#category = '전체';
    this.#property = 'name';
  }

  run() {
    this.reload();
    this.showAddRestaurantModal();
  }

  reload() {
    OutputView.renderRestaurantList(this.#restaurantList);
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem('restaurantList')) || [];
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant(this.#restaurantList);
      this.manageFormEvents();
    });
  }

  manageFormEvents() {
    const form = $('form');

    form.addEventListener('reset', () => OutputView.closeModal());
    form.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      RestaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      OutputView.closeModal();
      this.reload();
    });
  }

  createRestaurant() {
    const formData = {};

    FORM_INPUT_QUERY.forEach(id => {
      const input = $(id);
      formData[input.name] = input.name === 'distance' ? parseInt(input.value, 10) : input.value;
    });

    return formData;
  }
}

export default RestaurantController;

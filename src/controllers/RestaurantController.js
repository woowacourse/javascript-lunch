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
    OutputView.renderRestaurantList(this.#restaurantList);
    this.showAddRestaurantModal();
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem('restaurantList')) || [];
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant(this.#restaurantList);

      const form = $('form');
      if (!form) return;
      form.addEventListener('reset', () => OutputView.closeModal());
      form.addEventListener('submit', e => {
        e.preventDefault();
        const newRestaurant = this.createRestaurant();
        RestaurantService.addRestaurant(newRestaurant, this.#restaurantList);
        OutputView.closeModal();
      });
    });
  }

  createRestaurant() {
    const formData = {};

    FORM_INPUT_QUERY.forEach(id => {
      const input = $(id);
      formData[input.name] = input.name === 'distance' ? parseInt(input.value, 10) : input.value;
    });
    console.log(formData);

    return formData;
  }

  // const category = $('#category');
  // const name = $('#name');
  // const distance = $('#distance');
  // const description = $('#description');
  // const link = $('#link');
  // if (!category || !name || !distance || !description || !link) return;

  // return {
  //   category: category.value,
  //   name: name.value,
  //   distance: parseInt(distance.value, 10),
  //   description: description.value,
  //   link: link.value,
  // };
}

export default RestaurantController;

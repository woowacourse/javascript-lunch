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
    OutputView.renderFilterDropdown();
    this.reload();
    this.showAddRestaurantModal();
    this.manageFilterValue();
  }

  reload() {
    const filteredList = RestaurantService.filterByCategory(this.#category, this.#restaurantList);
    const processedList = RestaurantService.sortByProperty(this.#property, filteredList);

    OutputView.renderRestaurantList(processedList);
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem('restaurantList')) || [];
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant(this.#restaurantList);
      this.manageFormEvents();
      this.manageModalEvents();
    });
  }

  manageFormEvents() {
    const form = $('form');

    form.addEventListener('reset', () => OutputView.closeModal());
    form.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = RestaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      const isAddedComment = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedComment);

      if (!isAdded) return;
      this.reload();
      OutputView.closeModal();
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

  manageModalEvents() {
    const modalBackdrop = $('.modal-backdrop');

    modalBackdrop.addEventListener('click', () => {
      OutputView.closeModal();
    });
  }

  manageFilterValue() {
    const categoryFilter = $('#category-filter');
    categoryFilter.addEventListener('change', () => {
      this.#category = categoryFilter.options[categoryFilter.selectedIndex].value;
      this.reload();
    });

    const sortingFilter = $('#sorting-filter');
    sortingFilter.addEventListener('change', () => {
      this.#property = sortingFilter.options[sortingFilter.selectedIndex].value;
      this.reload();
    });
  }
}

export default RestaurantController;

import {
  DEFAULT_FILTERING_CATEGORY,
  DEFAULT_SORTING_PROPERTY,
  DEFAULT_TAB,
  FORM_INPUT_QUERY,
  LOCAL_STORAGE_KEY,
} from '../constant/constants';
import { $, $$ } from '../utils/querySelector';
import RestaurantService from '../domain/RestaurantService';
import OutputView from '../views/OutputView';

class RestaurantController {
  #restaurantList;

  #activeTab;

  #category;

  #property;

  constructor() {
    this.#restaurantList = this.fetchData();
    this.#activeTab = DEFAULT_TAB;
    this.#category = DEFAULT_FILTERING_CATEGORY;
    this.#property = DEFAULT_SORTING_PROPERTY;
  }

  run() {
    this.setTabEvents();
    this.setFilterValue();

    this.updateRestaurantList();
  }

  setTabEvents() {
    const tabButtons = Array.from($$('.button--tabmenu'));
    tabButtons.forEach(tabButton => {
      tabButton.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('active')) return;

        tabButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');

        this.#activeTab = e.target.id;
        this.updateRestaurantList();
      });
    });
  }

  updateRestaurantList() {
    if (this.#activeTab === 'favorite') {
      const favoriteList = RestaurantService.filterFavorite(this.#restaurantList);
      OutputView.renderRestaurantList(favoriteList);
    } else {
      const filteredList = RestaurantService.filterByCategory(this.#category, this.#restaurantList);
      const processedList = RestaurantService.sortByProperty(this.#property, filteredList);
      OutputView.renderRestaurantList(processedList);
    }
  }

  fetchData() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  }

  setAddRestaurantFormEvents() {
    const form = $('#add-restaurant');

    form.addEventListener('reset', () => OutputView.closeModal());
    form.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = RestaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      const isAddedMessage = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedMessage);

      if (!isAdded) return;
      this.updateRestaurantList();
      OutputView.closeModal();
    });
  }

  createRestaurant() {
    const formData = {};

    FORM_INPUT_QUERY.forEach(id => {
      const input = $(id);
      formData[input.name] = input.name === 'distance' ? parseInt(input.value, 10) : input.value;
    });
    formData.isFavorite = false;

    return formData;
  }

  setFilterValue() {
    const categoryFilter = $('#category-filter');
    categoryFilter.addEventListener('change', () => {
      this.#category = categoryFilter.options[categoryFilter.selectedIndex].value;
      this.updateRestaurantList();
    });

    const sortingFilter = $('#sorting-filter');
    sortingFilter.addEventListener('change', () => {
      this.#property = sortingFilter.options[sortingFilter.selectedIndex].value;
      this.updateRestaurantList();
    });
  }
}

export default RestaurantController;

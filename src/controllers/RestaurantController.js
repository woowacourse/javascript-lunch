import { FORM_INPUT_QUERY, LOCALSTORAGE_KEY } from '../constant/constants';
import RestaurantService from '../domain/RestaurantService';
import { $ } from '../utils/querySelector';
import OutputView from '../views/OutputView';
import Dropdown from '../components/Common/Dropdown';
import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../constant/options';

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
    this.showFilterDropdown();
    this.updateRestaurantList();
    this.showAddRestaurantModal();
    this.manageFilterValue();
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.RESTAURANT_LIST)) || [];
  }

  showFilterDropdown() {
    const filterContainer = $('.restaurant-filter-container');

    const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
    const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

    filterContainer.insertAdjacentHTML('beforeend', filterDropdown);
    filterContainer.insertAdjacentHTML('beforeend', sortDropdown);
  }

  updateRestaurantList() {
    const heart = './favorite-icon-lined.png';
    const redHeart = './favorite-icon-filled.png';

    const restaurantService = new RestaurantService();
    const filteredList = restaurantService.filterByCategory(this.#category, this.#restaurantList);
    const processedList = restaurantService.sortByProperty(this.#property, filteredList);

    OutputView.renderRestaurantList(processedList);

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.addEventListener('click', event => {
      const id = event.target.id;
      const restaurant = this.#restaurantList[id];
      const newFavoriteState = !restaurant.favorite;
      restaurant.favorite = newFavoriteState;
      event.target.src = newFavoriteState ? redHeart : heart;
    });
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant(this.#restaurantList);
      this.manageAddRestaurantFormEvents();
      this.manageModalEvents();
    });
  }

  manageAddRestaurantFormEvents() {
    const restaurantService = new RestaurantService();
    const formAddRestaurant = $('.form-add-restaurant');

    formAddRestaurant.addEventListener('reset', () => OutputView.closeModal());
    formAddRestaurant.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = restaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      const isAddedText = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedText);

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

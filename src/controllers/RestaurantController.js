import { FORM_INPUT_QUERY, LOCALSTORAGE_KEY } from '../constant/constants';
import RestaurantService from '../domain/RestaurantService';
import { $ } from '../utils/querySelector';
import OutputView from '../views/OutputView';

class RestaurantController {
  #restaurantList;

  #restaurantService;

  #isAllSelected;

  #category;

  #property;

  constructor() {
    this.#restaurantList = this.getRecentData();
    this.#restaurantService = new RestaurantService();

    this.#isAllSelected = true;
    this.#category = '전체';
    this.#property = 'name';
  }

  run() {
    this.showNavBar();
    this.showFilterDropdown();
    this.updateRestaurantList();
    this.showAddRestaurantModal();
    this.manageFilterValue();
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.RESTAURANT_LIST)) || [];
  }

  showNavBar() {
    const restaurantNavContainer = $('.restaurant-nav-container');
    const allRestaurantNav = $('#all-restaurant');
    const favoriteRestaurantNav = $('#favorite-restaurant');

    restaurantNavContainer.addEventListener('click', event => {
      allRestaurantNav.classList.remove('selected');
      favoriteRestaurantNav.classList.remove('selected');

      if (event.target === allRestaurantNav) {
        this.#isAllSelected = true;
        this.updateRestaurantList();
      } else {
        this.#isAllSelected = false;
        this.updateRestaurantList();
      }
      event.target.classList.add('selected');
    });
  }

  showFilterDropdown() {
    OutputView.renderFilterDropdown();
  }

  updateRestaurantList() {
    const currentRestaurantList = this.currentRestaurantList();

    const filteredList = this.#restaurantService.filterByCategory(this.#category, currentRestaurantList);
    const processedList = this.#restaurantService.sortByProperty(this.#property, filteredList);

    OutputView.renderRestaurantList(processedList);

    this.manageRestaurantItems();
  }

  currentRestaurantList() {
    if (!this.#isAllSelected) {
      return this.#restaurantService.filterByFavorite(this.#restaurantList);
    }
    return this.#restaurantList;
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
    const formAddRestaurant = $('.form-add-restaurant');

    formAddRestaurant.addEventListener('reset', () => OutputView.closeModal());
    formAddRestaurant.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = this.#restaurantService.addRestaurant(newRestaurant, this.#restaurantList);
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
      this.updateRestaurantList();
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

  manageRestaurantItems() {
    const restaurantList = $('.restaurant-list');
    restaurantList.addEventListener('click', event => {
      const favoriteButton = event.target.closest('.favorite-button');
      const restaurantItem = event.target.closest('.restaurant');

      const restaurantId = Number(restaurantItem.id);

      if (favoriteButton) {
        this.changeFavoriteButton(restaurantId, favoriteButton);
      } else if (restaurantItem) {
        this.showDetailRestaurantModal(restaurantId);
      }
    });
  }

  changeFavoriteButton(restaurantId, favoriteButton) {
    const isFavorite = this.#restaurantService.changeFavorite(restaurantId, this.#restaurantList);
    favoriteButton.src = isFavorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg';
  }

  showDetailRestaurantModal(restaurantId) {
    const targetRestaurant = this.#restaurantList.find(restaurant => restaurant.id === restaurantId);

    OutputView.renderDetailRestaurant(targetRestaurant);
    this.managedetailRestaurantEvents(restaurantId);
    this.manageModalEvents();

    const modalContainer = $('.modal-container');
    const favoriteButton = modalContainer.querySelector('.favorite-button');

    favoriteButton.addEventListener('click', () => {
      this.changeFavoriteButton(restaurantId, favoriteButton);
    });
  }

  managedetailRestaurantEvents(restaurantId) {
    const detailRestaurant = $('.detail-restaurant');
    const buttonContainer = detailRestaurant.querySelector('.button-container');
    const targetRestaurant = this.#restaurantList.find(restaurant => restaurant.id === restaurantId);
    buttonContainer.addEventListener('click', event => {
      const target = event.target;

      if (target.innerText === '삭제하기') {
        this.#restaurantList = this.#restaurantService.removeRestaurant(targetRestaurant, this.#restaurantList);
        alert('삭제되었습니다.');
      }
      this.updateRestaurantList();
      OutputView.closeModal();
    });
  }
}

export default RestaurantController;

import AddingRestaurantModal from './components/AddRestaurantModal/AddRestaurantModal';
import createFilterDropdown from './components/FilterDropdown/FilterDropdown';
import createHeader from './components/Header/Header';
import createNavbar from './components/Navbar/Navbar';
import { FORM_INPUT_QUERY, LOCALSTORAGE_KEY } from './constant/constants';
import RestaurantService from './domain/RestaurantService';
import { $ } from './utils/querySelector';
import OutputView from './views/OutputView';

class App {
  #restaurantList;

  #restaurantService;

  #isAllSelected;

  #category;

  #property;

  #addingRestaurantModal = new AddingRestaurantModal();

  // #restaurantDetailModal = new RestaurantDetailModal();

  constructor() {
    this.#restaurantList = this.getRecentData();
    this.#restaurantService = new RestaurantService();

    this.#isAllSelected = true;
    this.#category = '전체';
    this.#property = 'name';
  }

  run() {
    this.renderHeader();
    this.showAddRestaurantModal();
    this.renderNavbar();
    this.renderFilterDropdown();
    this.updateRestaurantList();
  }

  getRecentData() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.RESTAURANT_LIST)) || [];
  }

  renderHeader() {
    const container = $('#container');

    const header = createHeader({ title: '점심 뭐 먹지', imageSource: './add-button.png' });

    container.prepend(header);
    container.appendChild(this.#addingRestaurantModal.element);
  }

  showAddRestaurantModal() {
    const addRestaurantButton = $('.gnb__button');

    addRestaurantButton.addEventListener('click', () => {
      this.#addingRestaurantModal.open();
      this.manageAddRestaurantFormEvents();
      this.manageModalEvents();
    });
  }

  renderNavbar() {
    const container = $('#container');

    const navbar = createNavbar({
      firstTitle: '모든 음식점',
      secondTitle: '자주 가는 음식점',
      onClick: isAllSelected => {
        this.#isAllSelected = isAllSelected;
        this.updateRestaurantList();
      },
    });

    container.appendChild(navbar);
  }

  renderFilterDropdown() {
    const container = $('#container');

    const filterDropdown = createFilterDropdown({
      onChangeFilter: category => {
        this.#category = category;
        this.updateRestaurantList();
      },
      onChangeSort: property => {
        this.#property = property;
        this.updateRestaurantList();
      },
    });

    container.appendChild(filterDropdown);
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

  manageAddRestaurantFormEvents() {
    const formAddRestaurant = $('.form-add-restaurant');

    formAddRestaurant.addEventListener('reset', () => this.#addingRestaurantModal.close());
    formAddRestaurant.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = this.#restaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      const isAddedText = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedText);

      if (!isAdded) return;

      this.updateRestaurantList();
      this.#addingRestaurantModal.close();
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

export default App;

import Header from './components/Header/Header';
import AddingRestaurantModal from './components/AddRestaurantModal/AddRestaurantModal';
import Navbar from './components/Navbar/Navbar';
import FilterDropdown from './components/FilterDropdown/FilterDropdown';
import RestaurantItem from './components/Restaurant/RestaurantItem';
import DetailRestaurantModal from './components/Restaurant/DetailRestaurantModal';
import { FORM_INPUT_QUERY, LOCALSTORAGE_KEY } from './constant/constants';
import RestaurantService from './domain/RestaurantService';
import { $ } from './utils/querySelector';

class App {
  #restaurants;

  #restaurantService;

  #appOptions;

  #addRestaurantModal;

  constructor() {
    this.#restaurants = this.initializeRestaurantList();
    this.#restaurantService = new RestaurantService();
    this.#appOptions = {
      isAllRestaurantsSelected: true,
      category: '전체',
      property: 'name',
    };
    this.#addRestaurantModal = new AddingRestaurantModal();
  }

  initializeRestaurantList() {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.RESTAURANT_LIST)) || [];
  }

  run() {
    const container = $('#container');
    container.appendChild(this.#addRestaurantModal.element);
    this.renderComponents(container);
    this.updateRestaurantList(container);
  }

  renderComponents(container) {
    this.renderHeader(container);
    this.renderNavbar(container);
    this.renderFilterDropdown(container);
  }

  renderHeader(container) {
    const header = Header({
      title: '점심 뭐 먹지',
      imageSource: './add-button.png',
      onClick: () => {
        this.#addRestaurantModal.open();
        this.manageAddRestaurantFormEvents();
      },
    });

    container.prepend(header);
  }

  renderNavbar(container) {
    const navbar = Navbar({
      firstTitle: '모든 음식점',
      secondTitle: '자주 가는 음식점',
      onClick: isAllSelected => {
        this.#appOptions.isAllRestaurantsSelected = isAllSelected;
        this.updateRestaurantList(container);
      },
    });

    container.appendChild(navbar);
  }

  renderFilterDropdown(container) {
    const filterDropdown = FilterDropdown({
      onChangeFilter: category => {
        this.#appOptions.category = category;
        this.updateRestaurantList(container);
      },
      onChangeSort: property => {
        this.#appOptions.property = property;
        this.updateRestaurantList(container);
      },
    });

    container.appendChild(filterDropdown);
  }

  updateRestaurantList(container) {
    const restaurantListContainer = $('.restaurant-list-container');

    const currentRestaurantList = this.#appOptions.isAllRestaurantsSelected
      ? this.#restaurants
      : this.#restaurantService.filterByFavorite(this.#restaurants);
    const filteredList = this.#restaurantService.filterByCategory(this.#appOptions.category, currentRestaurantList);
    const processedList = this.#restaurantService.sortByProperty(this.#appOptions.property, filteredList);

    const listFragment = this.getRestaurantItemsFragment(processedList);

    restaurantListContainer.replaceChildren(listFragment);
    container.appendChild(restaurantListContainer);
  }

  getRestaurantItemsFragment(processedList) {
    const listFragment = document.createElement('ul');
    listFragment.classList.add('restaurant-list');

    const container = $('#container');

    const restaurantItems = processedList.map(restaurantItem =>
      RestaurantItem({
        restaurant: restaurantItem,
        onItemClick: () => {
          const detailRestaurant = new DetailRestaurantModal(restaurantItem);
          container.appendChild(detailRestaurant.element);
          detailRestaurant.open();
          this.manageDetailRestaurantEvents(detailRestaurant, restaurantItem);
        },
        onFavoriteImageClick: event => {
          this.handleFavoriteButtonToggle(event, restaurantItem);
        },
      }),
    );

    listFragment.replaceChildren();
    restaurantItems.forEach(child => listFragment.appendChild(child));

    return listFragment;
  }

  manageAddRestaurantFormEvents() {
    const formAddRestaurant = $('.form-add-restaurant');

    if (this.onSubmitFormAddRestaurant) {
      formAddRestaurant.removeEventListener('submit', this.onSubmitFormAddRestaurant);
    }

    this.onSubmitFormAddRestaurant = event => this.handleFormSubmit(event);
    formAddRestaurant.addEventListener('submit', this.onSubmitFormAddRestaurant);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const formAddRestaurant = $('.form-add-restaurant');

    const newRestaurant = this.createRestaurant();
    const isAdded = this.#restaurantService.addRestaurant(newRestaurant, this.#restaurants);
    const isAddedText = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
    alert(isAddedText);

    if (!isAdded) return;

    formAddRestaurant.reset();
    this.#addRestaurantModal.close();
    this.updateRestaurantList($('#container'));
  }

  createRestaurant() {
    const formData = {};

    FORM_INPUT_QUERY.forEach(id => {
      const input = $(id);
      formData[input.name] = input.name === 'distance' ? parseInt(input.value, 10) : input.value;
    });

    return formData;
  }

  manageDetailRestaurantEvents(detailRestaurant, restaurantItem) {
    const favoriteButton = detailRestaurant.element.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', event => {
      this.handleFavoriteButtonToggle(event, restaurantItem);
      this.updateRestaurantList($('#container'));
    });

    const buttonContainer = detailRestaurant.element.querySelector('.button-container');
    buttonContainer.addEventListener('click', event => {
      if (event.target.innerText === '삭제하기') {
        this.#restaurants = this.#restaurantService.removeRestaurant(restaurantItem, this.#restaurants);
        alert('삭제되었습니다.');
      }
      this.updateRestaurantList($('#container'));
      detailRestaurant.close();
    });
  }

  handleFavoriteButtonToggle(event, restaurantItem) {
    this.#restaurantService.toggleFavorite(restaurantItem, this.#restaurants);
    event.target.src = restaurantItem.favorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg';
  }
}

export default App;

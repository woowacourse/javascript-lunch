import Header from './components/Header.js';
import RestaurantList from './Restaurants/RestaurantList.js';
import AddRestaurantModal from './modal/AddRestaurantModal.js';
import DISTANCE from './constant/distance.js';
import CATEGORY from './constant/category.js';
import InputDropDown from './components/InputDropDown.js';

const SORT_BY = Object.freeze({
  name: '이름 순',
  distance: '거리 순',
});

class App {
  #categoryFilter;
  #sortingFilter;
  #currentCategory;
  #currentSorting;
  #restaurantList;

  constructor() {
    this.#init();
  }

  #init() {
    this.#createAppContainer();
    this.#createFilter();
    this.#initAppUI();
    this.#bindEvent();
  }

  #createAppContainer() {
    this.appContainer = document.createElement('div');
    this.appContainer.id = 'app';
    this.appContainer.classList.add('app');
    document.body.appendChild(this.appContainer);

    this.filterContainer = document.createElement('div');
    this.filterContainer.classList.add('restaurant-filter-container');

    this.restaurantListContainer = document.createElement('section');
    this.restaurantListContainer.classList.add('restaurant-list-container');

    this.restaurantList = document.createElement('ul');
    this.restaurantList.classList.add('restaurant-list');
    this.restaurantList.id = 'restaurant-list';

    this.restaurantListContainer.appendChild(this.restaurantList);
    this, this.appContainer.appendChild(this.filterContainer);
    this.appContainer.appendChild(this.restaurantListContainer);
  }

  #createFilter() {
    this.#categoryFilter = new InputDropDown({
      name: 'category',
      id: 'category-filter',
      option: CATEGORY,
      addDefaultOption: true,
      optionDefault: '전체',
    });
    this.#sortingFilter = new InputDropDown({
      nmae: 'sorting',
      id: 'sorting-filter',
      option: SORT_BY,
    });
    this.#currentCategory = '';
    this.#currentSorting = 'name';
    this.filterContainer.appendChild(this.#categoryFilter.getElement());
    this.filterContainer.appendChild(this.#sortingFilter.getElement());
  }

  #onChangedCategory = () => {
    const categoryElement = this.#categoryFilter.getElement();
    categoryElement.addEventListener('change', (event) => {
      this.#currentCategory = categoryElement.value;
      this.#restaurantList.sortRestaurantList(this.#currentCategory, this.#currentSorting);
    });
  };

  #onChangedSorting = () => {
    const sortingElement = this.#sortingFilter.getElement();
    sortingElement.addEventListener('change', (event) => {
      this.#currentSorting = sortingElement.value;
      this.#restaurantList.sortRestaurantList(this.#currentCategory, this.#currentSorting);
    });
  };

  #bindEvent = () => {
    this.#onChangedCategory();
    this.#onChangedSorting();
  };

  #modalClickHandler = () => {
    this.addRestaurantModal.openModal();
  };

  #initAppUI() {
    this.addRestaurantModal = new AddRestaurantModal(this.appContainer, this.restaurantListContainer);
    new Header({ appContainer: this.appContainer, onClickIcon: this.#modalClickHandler });
    this.#restaurantList = new RestaurantList(this.restaurantListContainer);
  }
}

export default App;

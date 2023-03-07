import '../css/style.css';
import './assets/category-asian.png';
import './assets/category-chinese.png';
import './assets/category-etc.png';
import './assets/category-japanese.png';
import './assets/category-korean.png';
import './assets/category-western.png';
import './assets/favorite-icon-filled.png';
import './assets/favorite-icon-lined.png';
import './components/header.js';
import Header from './components/header.js';
import CategoryFilter from './components/categoryFilter.js';
import SortingFilter from './components/sortingFilter.js';
import Modal from './components/modal.js';
import RestaurantsController from './domain/RestaurantsController';
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from './ui/modal';
import {
  executeChangeEventListener,
  executeClickEventListener,
  executeSubmitEventListener,
} from './util/eventListener';

const App = {
  restaurantsController: RestaurantsController.getInstance(),

  init() {
    this.initRender();
    this.initEventListeners();
  },

  initRender() {
    const header = new Header();
    header.render();

    const categoryFilter = new CategoryFilter();
    const sortingFilter = new SortingFilter();
    categoryFilter.render();
    sortingFilter.render();

    const modal = new Modal();
    modal.render();
  },

  initEventListeners() {
    this.controlNewRestaurantModal();
    this.controlFilter();
  },

  controlNewRestaurantModal() {
    executeClickEventListener('.gnb__button', () =>
      handleModalOpenButtonClick('.modal')
    );

    executeClickEventListener('.button--secondary', () =>
      handleModalCancelButtonClick('.modal')
    );

    executeClickEventListener('.modal-backdrop', () =>
      handleModalCancelButtonClick('.modal')
    );

    executeSubmitEventListener('#new-restaurant-form', (event: Event) => {
      this.restaurantsController.addNewRestaurant(event);
      handleModalCancelButtonClick('.modal');
    });
  },

  controlFilter() {
    executeChangeEventListener('#sorting-filter', (value: string) => {
      this.restaurantsController.sortRestaurantList(value);
    });

    executeChangeEventListener('#category-filter', (value: string) => {
      this.restaurantsController.filterRestaurantList(value);
    });
  },
};

App.init();

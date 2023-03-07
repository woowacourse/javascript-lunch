import '../css/style.css';
import Header from './components/header.js';
import CategoryFilter from './components/categoryFilter.js';
import SortingFilter from './components/sortingFilter.js';
import Modal from './components/modal.js';
import RestaurantsController from './domains/RestaurantsController';
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from './ui/modal';
import {
  executeChangeEventListener,
  executeClickEventListener,
  executeSubmitEventListener,
} from './utils/eventListener';
import { resetForm } from './ui/form';

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
      handleModalOpenButtonClick()
    );

    executeClickEventListener('.button--secondary', () =>
      handleModalCancelButtonClick()
    );

    executeClickEventListener('.modal-backdrop', () =>
      handleModalCancelButtonClick()
    );

    executeSubmitEventListener('#new-restaurant-form', (event: Event) => {
      if (this.restaurantsController.addNewRestaurant(event)) {
        handleModalCancelButtonClick();
      }

      resetForm('#new-restaurant-form', '.modal-container');
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

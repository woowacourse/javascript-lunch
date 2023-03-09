import '../css/style.css';
import Header from './components/header.js';
import Select from './components/select.js';
import Modal from './components/modal.js';
import NewRestaurantModalContent from './components/newRestaurantModalContent.js';
import RestaurantsController from './domains/RestaurantsController';
import {
  handleModalCloseButtonClick,
  handleModalOpenButtonClick,
} from './ui/modal';
import {
  executeOptionChangeEventListener,
  executeEventListener,
} from './utils/eventListener';
import { scrollToTopForm } from './ui/form';
import {
  FILTER_CLASS,
  FILTER_ID,
  FILTER_NAME,
  SELECT_OPTION_LIST,
} from './constants/filter';

const App = {
  restaurantsController: RestaurantsController.getInstance(),

  init() {
    this.initRender();
    this.initEventListeners();
  },

  initRender() {
    const header = new Header({ title: '점심 뭐 먹지' });
    header.render();

    const categoryFilter = new Select({
      id: FILTER_ID.CATEGORY,
      name: FILTER_NAME.CATEGORY,
      class: FILTER_CLASS,
      optionList: SELECT_OPTION_LIST.CATEGORY,
    });

    const sortingFilter = new Select({
      id: FILTER_ID.SORTING,
      name: FILTER_NAME.SORTING,
      class: FILTER_CLASS,
      optionList: SELECT_OPTION_LIST.SORTING,
    });

    categoryFilter.render('.restaurant-filter-container');
    sortingFilter.render('.restaurant-filter-container');

    const modal = new Modal();
    modal.render();

    const newRestaurantModalContent = new NewRestaurantModalContent();
    newRestaurantModalContent.render('.modal-container');
  },

  initEventListeners() {
    this.controlNewRestaurantModal();
    this.controlFilter();
  },

  controlNewRestaurantModal() {
    executeEventListener('.gnb__button', 'click', handleModalOpenButtonClick);

    executeEventListener(
      '.button--secondary',
      'click',
      handleModalCloseButtonClick
    );

    executeEventListener(
      '.modal-backdrop',
      'click',
      handleModalCloseButtonClick
    );

    executeEventListener('#new-restaurant-form', 'submit', (event: Event) => {
      event.preventDefault();

      if (this.restaurantsController.addNewRestaurant(event)) {
        handleModalCloseButtonClick();
      }

      scrollToTopForm('.modal-container');
    });
  },

  controlFilter() {
    executeOptionChangeEventListener('#sorting-filter', (value: string) => {
      this.restaurantsController.sortRestaurantList(value);
    });

    executeOptionChangeEventListener('#category-filter', (value: string) => {
      this.restaurantsController.filterRestaurantList(value);
    });
  },
};

App.init();

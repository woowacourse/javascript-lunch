import '../css/style.css';
import Header from './components/header.js';
import Select from './components/select.js';
import Modal from './components/modal.js';
import NewRestaurantModalContent from './components/newRestaurantModalContent.js';
import Navigation from './components/navigation';
import RestaurantList from './components/restaurantList';
import RestaurantManager from './domains/restaurantManager';
import { handleNavigationClick } from './handleUi/navigation';
import {
  handleModalCloseButtonClick,
  handleModalOpenButtonClick,
} from './handleUi/modal';
import { scrollToTopForm } from './handleUi/form';
import {
  executeOptionChangeEventListener,
  executeEventListener,
} from './utils/eventListener';
import {
  getListOnLocalStorage,
  saveListOnLocalStorage,
} from './utils/localStorage';
import { RestaurantType } from './type';
import {
  FILTER_CLASS,
  FILTER_ID,
  FILTER_NAME,
  SELECT_OPTION_LIST,
} from './constants/filter';
import { LOCAL_STORAGE_KEY } from './constants/localStorage';
import { handleFavoriteIcon } from './handleUi/restaurant';
import restaurantBottomSheet from './components/restaurantBottomSheet';

const App = {
  header: new Header({ selector: 'header', title: '점심 뭐 먹지' }),
  navBar: new Navigation({ selector: 'nav', class: 'nav-container' }),
  categoryFilter: new Select({
    selector: '.restaurant-filter-container',
    id: FILTER_ID.CATEGORY,
    name: FILTER_NAME.CATEGORY,
    class: FILTER_CLASS,
    optionList: SELECT_OPTION_LIST.CATEGORY,
  }),
  sortingFilter: new Select({
    selector: '.restaurant-filter-container',
    id: FILTER_ID.SORTING,
    name: FILTER_NAME.SORTING,
    class: FILTER_CLASS,
    optionList: SELECT_OPTION_LIST.SORTING,
  }),
  RestaurantManager: RestaurantManager.getInstance(),
  restaurantList: new RestaurantList({
    listRenderSelector: '.restaurant-list',
    additionRenderSelector: '.restaurant',
  }),
  modal: new Modal('.restaurant-add-modal'),
  newRestaurantModalContent: new NewRestaurantModalContent(),
  restaurantBottomSheet: new restaurantBottomSheet(),

  init() {
    this.RestaurantManager.initRestaurantList();
    this.initRender();
    this.initEventListeners();
  },

  initRender() {
    this.header.render();
    this.navBar.render();
    this.categoryFilter.render();
    this.sortingFilter.render();
    this.restaurantList.render(
      getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
    );
    this.modal.render();
    this.newRestaurantModalContent.render('.modal-container');
  },

  initEventListeners() {
    this.controlNavigation();
    this.controlNewRestaurantModal();
    this.controlFilter();
    this.controlRestaurant();
  },

  controlNavigation() {
    executeEventListener('.nav-container', 'click', () => {
      const selected = handleNavigationClick();

      if (selected.isAllRestaurant) {
        this.categoryFilter.show();
        this.sortingFilter.show();
      } else {
        this.categoryFilter.hide();
        this.sortingFilter.hide();
      }

      const list = selected.isAllRestaurant
        ? getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
        : getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

      this.restaurantList.render(list);
    });
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

      if (this.RestaurantManager.addNewRestaurant(event)) {
        this.restaurantList.render(
          getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
        );
        handleModalCloseButtonClick();
      }

      scrollToTopForm('.modal-container');
    });
  },

  controlFilter() {
    executeOptionChangeEventListener('#sorting-filter', (value: string) => {
      const sortedList = this.RestaurantManager.sortRestaurantList(value);

      this.restaurantList.render(sortedList);
    });

    executeOptionChangeEventListener('#category-filter', (value: string) => {
      const selectedList = this.RestaurantManager.filterRestaurantList(value);

      this.restaurantList.render(selectedList);
    });
  },

  controlRestaurant() {
    executeEventListener('.restaurant-list', 'click', (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement && target.alt === '즐겨찾기') {
        const favoriteLined = target.className.split(' ')[1];
        const number = favoriteLined[favoriteLined.length - 1];

        const isFavorite = handleFavoriteIcon(number);

        const restaurantList = getListOnLocalStorage(
          LOCAL_STORAGE_KEY.RESTAURANT_LIST
        ) as RestaurantType[];
        const favoriteList = getListOnLocalStorage(
          LOCAL_STORAGE_KEY.FAVORITE_LIST
        ) as RestaurantType[];

        const parsedNumber = parseInt(number, 10);
        const selected = restaurantList[parsedNumber];
        if (isFavorite) {
          if (!favoriteList.find(favorite => favorite.name === selected.name)) {
            favoriteList.push(selected);
          }
          restaurantList[parsedNumber].isFavorite = true;
          favoriteList[favoriteList.length - 1].isFavorite = true;
        } else {
          restaurantList[parsedNumber].isFavorite = false;
          const index = favoriteList.findIndex(
            favorite => favorite.name === restaurantList[parsedNumber].name
          );
          favoriteList.splice(index, 1);
        }

        saveListOnLocalStorage(
          LOCAL_STORAGE_KEY.RESTAURANT_LIST,
          restaurantList
        );
        saveListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST, favoriteList);
      }

      if (
        target instanceof HTMLLIElement ||
        target instanceof HTMLHeadingElement ||
        target instanceof HTMLSpanElement ||
        target instanceof HTMLParagraphElement ||
        target instanceof HTMLDivElement ||
        (target instanceof HTMLImageElement &&
          target.className === 'category-icon')
      ) {
        this.restaurantBottomSheet.render();
      }
    });
  },
};

App.init();

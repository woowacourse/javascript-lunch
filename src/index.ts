import '../css/style.css';
import Header from './components/header.js';
import Select from './components/select.js';
import Modal from './components/modal.js';
import restaurantAddContainer from './components/restaurantAddContainer';
import Navigation from './components/navigation';
import RestaurantList from './components/restaurantList';
import RestaurantManager from './domains/restaurantManager';
import { handleNavigationClick } from './handleUi/navigation';
import { handleModalClose, handleModalOpen } from './handleUi/modal';
import { resetForm, scrollToTopForm } from './handleUi/form';
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
import { handleFavoriteIcon } from './handleUi/favoriteIcon';
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
  restaurantAddModal: new Modal({
    selector: '.restaurant-add-modal',
    id: 'restaurant-add-modal',
    backdrop: 'restaurant-add-backdrop',
    container: 'restaurant-add-container',
  }),
  restaurantAddContainer: new restaurantAddContainer({
    selector: '.restaurant-add-container',
  }),
  restaurantBottomSheet: new Modal({
    selector: '.restaurant-bottom-sheet',
    id: 'restaurant-bottom-sheet',
    backdrop: 'restaurant-bottom-sheet-backdrop',
    container: 'restaurant-bottom-sheet-container',
  }),
  restaurantBottomSheetContainer: new restaurantBottomSheet({
    selector: '.restaurant-bottom-sheet-container',
  }),

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
    this.restaurantAddModal.render();
    this.restaurantAddContainer.render();
    this.restaurantBottomSheet.render();
  },

  initEventListeners() {
    this.controlNavigation();
    this.controlFilter();
    this.controlRestaurantList();
    this.controlRestaurantAddContainer();
    this.controlRestaurantBottomSheet();
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

  controlRestaurantList() {
    executeEventListener('.restaurant-list', 'click', (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement && target.alt === '즐겨찾기') {
        const linedFavoriteIcon = target.className.split(' ')[1];
        const number = linedFavoriteIcon[linedFavoriteIcon.length - 1];

        const isFavorite = handleFavoriteIcon(number).list;

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
    });

    executeEventListener('.restaurant-list', 'click', (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLButtonElement) {
        const restaurantList = getListOnLocalStorage(
          LOCAL_STORAGE_KEY.RESTAURANT_LIST
        ) as RestaurantType[];

        const index = parseInt(target.name, 10);
        const restaurant = restaurantList[index];
        this.restaurantBottomSheetContainer.render(restaurant);

        handleModalOpen('#restaurant-bottom-sheet');

        executeEventListener(
          '#favorite-icon-modal',
          'click',
          (event: Event) => {
            const target = event.target;

            if (
              target instanceof HTMLImageElement &&
              target.alt === '즐겨찾기'
            ) {
              const linedFavoriteIcon = target.className.split(' ')[1];
              const number = linedFavoriteIcon[linedFavoriteIcon.length - 1];

              const isFavorite = handleFavoriteIcon(number).modal;

              const restaurantList = getListOnLocalStorage(
                LOCAL_STORAGE_KEY.RESTAURANT_LIST
              ) as RestaurantType[];
              const favoriteList = getListOnLocalStorage(
                LOCAL_STORAGE_KEY.FAVORITE_LIST
              ) as RestaurantType[];

              const parsedNumber = parseInt(number, 10);
              const selected = restaurantList[parsedNumber];
              if (isFavorite) {
                if (
                  !favoriteList.find(
                    favorite => favorite.name === selected.name
                  )
                ) {
                  favoriteList.push(selected);
                }
                restaurantList[parsedNumber].isFavorite = true;
                favoriteList[favoriteList.length - 1].isFavorite = true;
              } else {
                restaurantList[parsedNumber].isFavorite = false;
                const index = favoriteList.findIndex(
                  favorite =>
                    favorite.name === restaurantList[parsedNumber].name
                );
                favoriteList.splice(index, 1);
              }

              this.RestaurantManager.updateRestaurantList(restaurantList);
              this.RestaurantManager.updateFavoriteList(favoriteList);
            }
          }
        );

        executeEventListener(
          '.button-container-info-modal',
          'click',
          (event: Event) => {
            const target = event.target;

            if (target instanceof HTMLButtonElement) {
              if (target.ariaLabel === 'delete') {
                restaurantList.splice(index, 1);
                restaurantList.map((restaurant, i) => (restaurant.number = i));
                this.RestaurantManager.updateRestaurantList(restaurantList);
                this.restaurantList.render(
                  getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
                );
              }
              handleModalClose('#restaurant-bottom-sheet');
            }
          }
        );
      }
    });
  },

  controlRestaurantAddContainer() {
    executeEventListener('.gnb__button', 'click', () => {
      handleModalOpen('#restaurant-add-modal');
      resetForm('#new-restaurant-form');
      scrollToTopForm('.restaurant-add-container');
    });

    executeEventListener('.button--secondary', 'click', (event: Event) => {
      event.preventDefault();

      handleModalClose('#restaurant-add-modal');
      resetForm('#new-restaurant-form');
      scrollToTopForm('.restaurant-add-container');
    });

    executeEventListener('.restaurant-add-backdrop', 'click', () => {
      handleModalClose('#restaurant-add-modal');
      resetForm('#new-restaurant-form');
      scrollToTopForm('.restaurant-add-container');
    });

    executeEventListener('#new-restaurant-form', 'submit', (event: Event) => {
      event.preventDefault();

      if (this.RestaurantManager.addNewRestaurant(event)) {
        this.restaurantList.render(
          getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
        );
        handleModalClose('#restaurant-add-modal');
        resetForm('#new-restaurant-form');
      }

      scrollToTopForm('.restaurant-add-container');
    });
  },

  controlRestaurantBottomSheet() {
    executeEventListener('.restaurant-bottom-sheet-backdrop', 'click', () => {
      handleModalClose('#restaurant-bottom-sheet');
    });
  },
};

App.init();

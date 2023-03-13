import '../css/style.css';
import { components } from './components/components';
import RestaurantManager from './domains/restaurantManager';
import { handleFavoriteIcon } from './handleUi/favoriteIcon';
import { handleNavigationClick } from './handleUi/navigation';
import { handleModalClose, handleModalOpen } from './handleUi/modal';
import { resetForm, scrollToTopForm } from './handleUi/form';
import {
  executeOptionChangeEventListener,
  executeEventListener,
} from './utils/eventListener';
import { getListOnLocalStorage } from './utils/localStorage';
import { RestaurantType } from './type';
import { LOCAL_STORAGE_KEY } from './constants/localStorage';
import { handleHeaderTitleClick } from './handleUi/header';

const App = {
  RestaurantManager: RestaurantManager.getInstance(),

  init() {
    this.RestaurantManager.initRestaurantList();
    this.initRender();
    this.initEventListeners();
  },

  initRender() {
    components.header.render();
    components.navBar.render();
    components.categoryFilter.render();
    components.sortingFilter.render();
    components.restaurantList.render(
      getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
    );
    components.restaurantAddModal.render();
    components.restaurantAddContainer.render();
    components.restaurantBottomSheet.render();
  },

  initEventListeners() {
    this.controlHeader();
    this.controlNavigation();
    this.controlFilter();
    this.controlRestaurantList();
    this.controlRestaurantAddContainer();
    this.controlRestaurantBottomSheet();
  },

  controlHeader() {
    executeEventListener('header', 'click', handleHeaderTitleClick);
  },

  controlNavigation() {
    executeEventListener('.nav-container', 'click', this.handleNavigationClick);
  },

  handleNavigationClick() {
    const selected = handleNavigationClick();

    if (selected.isAllRestaurant) {
      components.categoryFilter.show();
      components.sortingFilter.show();
    } else {
      components.categoryFilter.hide();
      components.sortingFilter.hide();
    }

    const list = selected.isAllRestaurant
      ? getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
      : getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

    components.restaurantList.render(list);
  },

  controlFilter() {
    executeOptionChangeEventListener('#sorting-filter', (value: string) => {
      const sortedList = this.RestaurantManager.sortRestaurantList(value);

      components.restaurantList.render(sortedList);
    });

    executeOptionChangeEventListener('#category-filter', (value: string) => {
      const selectedList = this.RestaurantManager.filterRestaurantList(value);

      components.restaurantList.render(selectedList);
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

        this.RestaurantManager.updateRestaurantList(restaurantList);
        this.RestaurantManager.updateFavoriteList(favoriteList);
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
        components.restaurantBottomSheetContainer.render(restaurant);
        this.controlRestaurantBottomSheet();
        handleModalOpen('#restaurant-bottom-sheet');
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
        components.restaurantList.render(
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

    executeEventListener('#favorite-icon-modal', 'click', (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement && target.alt === '즐겨찾기') {
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

        this.RestaurantManager.updateRestaurantList(restaurantList);
        this.RestaurantManager.updateFavoriteList(favoriteList);
      }
    });

    executeEventListener(
      '.button-container-info-modal',
      'click',
      (event: Event) => {
        const target = event.target;

        if (target instanceof HTMLButtonElement) {
          if (target.ariaLabel === 'delete') {
            const restaurantList = getListOnLocalStorage(
              LOCAL_STORAGE_KEY.RESTAURANT_LIST
            ) as RestaurantType[];

            const index = parseInt(target.name, 10);
            const favoriteList = getListOnLocalStorage(
              LOCAL_STORAGE_KEY.FAVORITE_LIST
            ) as RestaurantType[];
            if (restaurantList[index].isFavorite === true) {
              const favoriteIndex = favoriteList.findIndex(
                favorite => favorite.name === restaurantList[index].name
              );

              favoriteList.splice(favoriteIndex, 1);
              favoriteList.forEach((favorite, i) => (favorite.number = i));
              this.RestaurantManager.updateFavoriteList(favoriteList);
            }
            restaurantList.splice(index, 1);
            restaurantList.forEach((restaurant, i) => (restaurant.number = i));
            this.RestaurantManager.updateRestaurantList(restaurantList);
            components.restaurantList.render(
              getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
            );
          }

          handleModalClose('#restaurant-bottom-sheet');
        }
      }
    );
  },
};

App.init();

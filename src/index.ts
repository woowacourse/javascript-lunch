import '../css/style.css';
import { components } from './components/components';
import RestaurantManager from './domains/restaurantManager';
import { handleFavoriteIconClick } from './handleUi/favoriteIcon';
import { handleNavigationClick } from './handleUi/navigation';
import { handleModalClose, handleModalOpen } from './handleUi/modal';
import { handleGNBClick, handleHeaderTitleClick } from './handleUi/header';
import { handleFilterChange } from './handleUi/filter';
import { executeEventListener } from './utils/eventListener';
import { getListOnLocalStorage } from './utils/localStorage';
import { LOCAL_STORAGE_KEY } from './constants/localStorage';
import { RestaurantType } from './type/types';
import { isRestaurant, isRestaurantList } from './type/customTypeGuards';
import { handleRestaurantItemClick } from './handleUi/restaurantItem';
import {
  handleBackdropClick,
  handleCancelClick,
  handleNewRestaurantFormSubmit,
} from './handleUi/restaurantAddContainer';

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
  },

  controlHeader() {
    executeEventListener('header', 'click', (event: Event) => {
      handleHeaderTitleClick(event);
      handleGNBClick(event);
    });
  },

  controlNavigation() {
    executeEventListener('.nav-container', 'click', handleNavigationClick);
  },

  controlFilter() {
    executeEventListener(
      '.restaurant-filter-container',
      'change',
      handleFilterChange
    );
  },

  controlRestaurantList() {
    executeEventListener('.restaurant-list', 'click', (event: Event) => {
      const { restaurantList, favoriteList } = handleFavoriteIconClick(event);

      if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
        this.RestaurantManager.updateRestaurantList(restaurantList);
        this.RestaurantManager.updateFavoriteList(favoriteList);
      }

      const restaurant = handleRestaurantItemClick(event);
      if (isRestaurant(restaurant)) {
        this.controlRestaurantBottomSheet(restaurant);
      }
    });
  },

  controlRestaurantAddContainer() {
    executeEventListener(
      '.restaurant-add-container',
      'click',
      (event: Event) => {
        event.preventDefault();
        handleCancelClick(event);
        handleNewRestaurantFormSubmit(event, this.RestaurantManager);
      }
    );

    executeEventListener(
      '.restaurant-add-backdrop',
      'click',
      handleBackdropClick
    );
  },

  controlRestaurantBottomSheet(restaurant: RestaurantType) {
    components.restaurantBottomSheetContainer.render(restaurant);
    handleModalOpen('#restaurant-bottom-sheet');

    executeEventListener('.restaurant-bottom-sheet-backdrop', 'click', () => {
      handleModalClose('#restaurant-bottom-sheet');
    });

    executeEventListener('.head-info', 'click', (event: Event) => {
      const { restaurantList, favoriteList } = handleFavoriteIconClick(event);

      if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
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

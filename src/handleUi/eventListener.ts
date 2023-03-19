import RestaurantManager from '../domains/RestaurantManager';
import { components } from '../components/components';
import { handleGNBClick, handleHeaderTitleClick } from './header';
import { handleNavigationClick } from './navigation';
import { handleFilterChange } from './filter';
import { handleRestaurantItemClick } from './restaurantItem';
import { handleFavoriteIconClick } from './favoriteIcon';
import { handleModalClose, handleModalOpen } from './modal';
import {
  handleBackdropClick,
  handleNewRestaurantAddSubmit,
  handleNewRestaurantCancelClick,
} from './restaurantAddContainer';
import { executeEventListener } from '../utils/eventListener';
import { handleDeleteClick } from './bottomSheet';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { isRestaurant, isRestaurantList } from '../type/customTypeGuards';

export const eventListener = {
  initEventListeners(restaurantManager: RestaurantManager) {
    this.controlHeader();
    this.controlNavigation();
    this.controlFilter();
    this.controlRestaurantList(restaurantManager);
    this.controlRestaurantAddContainer(restaurantManager);
  },

  controlHeader() {
    executeEventListener({ selector: 'header', type: 'click' }, (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLHeadingElement) {
        handleHeaderTitleClick();
      }

      if (target instanceof HTMLImageElement) {
        handleGNBClick();
      }
    });
  },

  controlNavigation() {
    executeEventListener({ selector: '.nav-container', type: 'click' }, (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLButtonElement) {
        const restaurantList = handleNavigationClick(target);
        if (isRestaurantList(restaurantList)) {
          components.restaurantList.render(restaurantList);
        }
      }
    });
  },

  controlFilter() {
    executeEventListener(
      { selector: '.restaurant-filter-container', type: 'change' },
      (event: Event) => {
        const target = event.target;

        if (target instanceof HTMLSelectElement) {
          const restaurantList = handleFilterChange(target);
          if (isRestaurantList(restaurantList)) {
            components.restaurantList.render(restaurantList);
          }
        }
      }
    );
  },

  controlRestaurantList(restaurantManager: RestaurantManager) {
    executeEventListener(
      { selector: '.restaurant-list-container', type: 'click' },
      (event: Event) => {
        const target = event.target;

        if (target instanceof HTMLImageElement && target.alt === '즐겨찾기') {
          handleFavoriteIconClick(target, restaurantManager);
        }

        if (target instanceof HTMLButtonElement) {
          const restaurant = handleRestaurantItemClick(target);
          if (isRestaurant(restaurant)) {
            components.restaurantBottomSheetContent.render(restaurant);
          }
          this.controlRestaurantBottomSheet(restaurantManager);
        }
      }
    );
  },

  controlRestaurantAddContainer(restaurantManager: RestaurantManager) {
    executeEventListener({ selector: '#add-cancel', type: 'click' }, (event: Event) => {
      const target = event.target;
      event.preventDefault();

      if (target instanceof HTMLButtonElement && target.ariaLabel === 'cancel') {
        handleNewRestaurantCancelClick();
      }
    });

    executeEventListener({ selector: '.modal-backdrop', type: 'click' }, (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLDivElement && target.className === 'modal-backdrop') {
        handleBackdropClick();
      }
    });

    executeEventListener({ selector: '#new-restaurant-form', type: 'submit' }, (event: Event) => {
      const target = event.target;
      event.preventDefault();

      if (target instanceof HTMLFormElement && restaurantManager.addNewRestaurant(event)) {
        handleNewRestaurantAddSubmit();
        components.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
      }
    });
  },

  controlRestaurantBottomSheet(restaurantManager: RestaurantManager) {
    handleModalOpen('#restaurant-bottom-sheet');

    executeEventListener({ selector: '.modal-backdrop', type: 'click' }, () => {
      handleModalClose('#restaurant-bottom-sheet');
    });

    executeEventListener({ selector: '.head-info', type: 'click' }, (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement && target.alt === '즐겨찾기') {
        handleFavoriteIconClick(target, restaurantManager);
      }
    });

    executeEventListener(
      { selector: '.button-container-info-modal', type: 'click' },
      (event: Event) => {
        const target = event.target;

        if (target instanceof HTMLButtonElement) {
          handleModalClose('#restaurant-bottom-sheet');
        }

        if (target instanceof HTMLButtonElement && target.ariaLabel === 'delete') {
          handleDeleteClick(target, restaurantManager);
          components.restaurantList.render(
            getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
          );
        }
      }
    );
  },
};

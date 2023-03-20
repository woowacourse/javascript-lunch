import RestaurantManager from '../domains/RestaurantManager';
import { handleGNBClick, handleHeaderTitleClick } from './header';
import { handleNavigationClick } from './navigation';
import { handleFilterChange } from './filter';
import { handleRestaurantItemClick } from './restaurantItem';
import { handleFavoriteIconClick } from './favoriteIcon';
import { handleModalClose } from './modal';
import { handleNewRestaurantAdd, handleNewRestaurantCancel } from './restaurantAddContainer';
import { executeEventListener } from '../utils/eventListener';
import { handleDeleteClick } from './bottomSheet';

const controlHeader = () => {
  executeEventListener({ selector: 'header', type: 'click' }, (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLHeadingElement) {
      handleHeaderTitleClick();
    }

    if (target instanceof HTMLImageElement) {
      handleGNBClick();
    }
  });
};

const controlNavigation = () => {
  executeEventListener({ selector: '.nav-container', type: 'click' }, (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLButtonElement) {
      handleNavigationClick(target);
    }
  });
};

const controlFilter = () => {
  executeEventListener(
    { selector: '.restaurant-filter-container', type: 'change' },
    (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLSelectElement) {
        handleFilterChange(target);
      }
    }
  );
};

const controlRestaurantBottomSheet = (restaurantManager: RestaurantManager) => {
  executeEventListener({ selector: '.restaurant-bottom-sheet', type: 'click' }, (event: Event) => {
    const target = event.target;
    if (
      target instanceof HTMLImageElement &&
      target.closest('.restaurant-bottom-sheet') &&
      target.alt === '즐겨찾기'
    ) {
      handleFavoriteIconClick(target, restaurantManager);
    }

    if (target instanceof HTMLButtonElement && target.ariaLabel === 'delete') {
      handleDeleteClick(target, restaurantManager);
    }

    if (
      (target instanceof HTMLDivElement && target.className === 'modal-backdrop') ||
      (target instanceof HTMLButtonElement && target.ariaLabel === 'close') ||
      (target instanceof HTMLButtonElement && target.ariaLabel === 'delete')
    ) {
      handleModalClose('#restaurant-bottom-sheet');
    }
  });
};

const controlRestaurantList = (restaurantManager: RestaurantManager) => {
  executeEventListener(
    { selector: '.restaurant-list-container', type: 'click' },
    (event: Event) => {
      const target = event.target;
      if (
        target instanceof HTMLImageElement &&
        target.closest('.restaurant-list-container') &&
        target.alt === '즐겨찾기'
      ) {
        handleFavoriteIconClick(target, restaurantManager);
      }

      if (target instanceof HTMLButtonElement) {
        handleRestaurantItemClick(target);
      }
    }
  );
};

const controlRestaurantAddContainer = (restaurantManager: RestaurantManager) => {
  executeEventListener({ selector: '.restaurant-add-modal', type: 'click' }, (event: Event) => {
    const target = event.target;
    if (
      (target instanceof HTMLButtonElement && target.ariaLabel === 'cancel') ||
      (target instanceof HTMLDivElement && target.className === 'modal-backdrop')
    ) {
      handleNewRestaurantCancel();
    }
  });

  executeEventListener({ selector: '.restaurant-add-modal', type: 'submit' }, (event: Event) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof HTMLFormElement && restaurantManager.addNewRestaurant(event)) {
      handleNewRestaurantAdd();
    }
  });
};

export const initEventListeners = (restaurantManager: RestaurantManager) => {
  controlHeader();
  controlNavigation();
  controlFilter();
  controlRestaurantList(restaurantManager);
  controlRestaurantAddContainer(restaurantManager);
  controlRestaurantBottomSheet(restaurantManager);
};

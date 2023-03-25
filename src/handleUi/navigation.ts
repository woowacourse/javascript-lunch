import { $ } from '../utils/selector';
import { components } from '../components/components';
import { ARIA_LABEL } from '../constants/navigation';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { NavigationDom } from '../type/types';

const showAllRestaurantList = ($navigation: NavigationDom) => {
  if (
    $navigation.$primaryText instanceof HTMLButtonElement &&
    $navigation.$primaryBar instanceof HTMLButtonElement &&
    $navigation.$secondaryText instanceof HTMLButtonElement &&
    $navigation.$secondaryBar instanceof HTMLButtonElement
  ) {
    $navigation.$primaryText.classList.add('selected-text');
    $navigation.$primaryBar.classList.add('selected-bar');
    $navigation.$secondaryText.classList.remove('selected-text');
    $navigation.$secondaryBar.classList.remove('selected-bar');
  }

  return true;
};

const showFavoriteList = ($navigation: NavigationDom) => {
  if (
    $navigation.$primaryText instanceof HTMLButtonElement &&
    $navigation.$primaryBar instanceof HTMLButtonElement &&
    $navigation.$secondaryText instanceof HTMLButtonElement &&
    $navigation.$secondaryBar instanceof HTMLButtonElement
  ) {
    $navigation.$secondaryText.classList.add('selected-text');
    $navigation.$secondaryBar.classList.add('selected-bar');
    $navigation.$primaryText.classList.remove('selected-text');
    $navigation.$primaryBar.classList.remove('selected-bar');
  }

  return false;
};

const isAllRestaurants = (target: HTMLButtonElement): boolean => {
  const $navigation = {
    $primaryText: $('.text-button--primary'),
    $primaryBar: $('.bar-button--primary'),
    $secondaryText: $('.text-button--secondary'),
    $secondaryBar: $('.bar-button--secondary'),
  };

  return target.ariaLabel === ARIA_LABEL.ALL_RESTAURANTS
    ? showAllRestaurantList($navigation)
    : showFavoriteList($navigation);
};

export const handleNavigationClick = (target: HTMLButtonElement) => {
  if (isAllRestaurants(target)) {
    components.categoryFilter.show();
    components.sortingFilter.show();
    components.restaurantListContainer.render();
    components.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
  } else {
    components.categoryFilter.hide();
    components.sortingFilter.hide();
    components.favoriteListContainer.render();
    components.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST));
  }
};

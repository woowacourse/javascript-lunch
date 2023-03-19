import { $ } from '../utils/selector';
import { components } from '../components/components';
import { ARIA_LABEL, SELECTED_CLASS_NAME } from '../constants/navigation';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { NavigationDom } from '../type/types';

const showAllRestaurantList = ($navigation: NavigationDom) => {
  $navigation.$primaryText?.classList.add(SELECTED_CLASS_NAME.TEXT);
  $navigation.$primaryBar?.classList.add(SELECTED_CLASS_NAME.BAR);
  $navigation.$secondaryText?.classList.remove(SELECTED_CLASS_NAME.TEXT);
  $navigation.$secondaryBar?.classList.remove(SELECTED_CLASS_NAME.BAR);
};

const showFavoriteRestaurantList = ($navigation: NavigationDom) => {
  $navigation.$secondaryText?.classList.add(SELECTED_CLASS_NAME.TEXT);
  $navigation.$secondaryBar?.classList.add(SELECTED_CLASS_NAME.BAR);
  $navigation.$primaryText?.classList.remove(SELECTED_CLASS_NAME.TEXT);
  $navigation.$primaryBar?.classList.remove(SELECTED_CLASS_NAME.BAR);
};

const toggleSelected = (isAllRestaurants: boolean): boolean => {
  const $navigation = {
    $primaryText: $('.text-button--primary'),
    $primaryBar: $('.text-button--secondary'),
    $secondaryText: $('.bar-button--primary'),
    $secondaryBar: $('.bar-button--secondary'),
  };

  if (isAllRestaurants) showAllRestaurantList($navigation);
  else showFavoriteRestaurantList($navigation);

  return isAllRestaurants;
};

const isAllRestaurants = (target: HTMLButtonElement): boolean => {
  if (target.ariaLabel === ARIA_LABEL.ALL_RESTAURANTS) {
    return toggleSelected(true);
  }

  return toggleSelected(false);
};

export const handleNavigationClick = (target: HTMLButtonElement) => {
  if (isAllRestaurants(target)) {
    components.categoryFilter.show();
    components.sortingFilter.show();

    return getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  } else {
    components.categoryFilter.hide();
    components.sortingFilter.hide();

    return getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);
  }
};

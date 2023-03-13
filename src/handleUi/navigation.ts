import { $ } from '../utils/selector';
import { SELECTOR } from '../constants/selector';
import { components } from '../components/components';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { ARIA_LABEL, SELECTED_CLASS_NAME } from '../constants/navigation';

export const handleNavigationClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLButtonElement) {
    if (isAllRestaurants(target)) {
      components.categoryFilter.show();
      components.sortingFilter.show();
      components.restaurantList.render(
        getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST)
      );
    } else {
      components.categoryFilter.hide();
      components.sortingFilter.hide();
      components.restaurantList.render(
        getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST)
      );
    }
  }
};

const isAllRestaurants = (target: HTMLButtonElement): boolean => {
  if (target.ariaLabel === ARIA_LABEL.ALL_RESTAURANTS) {
    return toggleSelected(true);
  }

  return toggleSelected(false);
};

const toggleSelected = (isAllRestaurants: boolean): boolean => {
  const $navigation = {
    $primaryText: $(SELECTOR.TEXT_BUTTON_PRIMARY),
    $primaryBar: $(SELECTOR.BAR_BUTTON_PRIMARY),
    $secondaryText: $(SELECTOR.TEXT_BUTTON_SECONDARY),
    $secondaryBar: $(SELECTOR.BAR_BUTTON_SECONDARY),
  };

  if (isAllRestaurants) {
    $navigation.$primaryText?.classList.add(SELECTED_CLASS_NAME.TEXT);
    $navigation.$primaryBar?.classList.add(SELECTED_CLASS_NAME.BAR);
    $navigation.$secondaryText?.classList.remove(SELECTED_CLASS_NAME.TEXT);
    $navigation.$secondaryBar?.classList.remove(SELECTED_CLASS_NAME.BAR);
  } else {
    $navigation.$secondaryText?.classList.add(SELECTED_CLASS_NAME.TEXT);
    $navigation.$secondaryBar?.classList.add(SELECTED_CLASS_NAME.BAR);
    $navigation.$primaryText?.classList.remove(SELECTED_CLASS_NAME.TEXT);
    $navigation.$primaryBar?.classList.remove(SELECTED_CLASS_NAME.BAR);
  }

  return isAllRestaurants;
};

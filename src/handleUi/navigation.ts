import { $ } from '../utils/selector';
import { SELECTOR } from '../constants/selector';

export const handleNavigationClick = () => {
  const isAllRestaurant = $(SELECTOR.TEXT_BUTTON_PRIMARY)?.classList.toggle(
    'selected-text'
  );

  const isFavorite = $(SELECTOR.TEXT_BUTTON_SECONDARY)?.classList.toggle(
    'selected-text'
  );

  $(SELECTOR.BAR_BUTTON_PRIMARY)?.classList.toggle('selected-bar');
  $(SELECTOR.BAR_BUTTON_SECONDARY)?.classList.toggle('selected-bar');

  return { isAllRestaurant: isAllRestaurant, isFavorite: isFavorite };
};

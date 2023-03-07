import { $ } from '../util/selector';
import { SELECTOR } from '../constant/selector';

export const handleModalCancelButtonClick = () => {
  $(SELECTOR.MODAL)?.classList.remove('modal--open');

  const newRestaurantInputs = $('#new-restaurant-form') as HTMLFormElement;
  newRestaurantInputs.reset();
};

export const handleModalOpenButtonClick = () => {
  $(SELECTOR.MODAL)?.classList.add('modal--open');
};

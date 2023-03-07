import { $inBody } from '../utils/selector';
import { SELECTOR } from '../constants/selector';

export const handleModalCancelButtonClick = () => {
  $inBody(SELECTOR.MODAL)?.classList.remove('modal--open');

  const newRestaurantInputs = $inBody(
    '#new-restaurant-form'
  ) as HTMLFormElement;
  newRestaurantInputs.reset();
};

export const handleModalOpenButtonClick = () => {
  $inBody(SELECTOR.MODAL)?.classList.add('modal--open');
};

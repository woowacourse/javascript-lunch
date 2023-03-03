import { $ } from '../util/selector';

export const handleModalCancelButtonClick = (selector: string) => {
  $(selector)?.classList.remove('modal--open');

  const newRestaurantInputs = $('#new-restaurant-form') as HTMLFormElement;
  newRestaurantInputs.reset();
};

export const handleModalOpenButtonClick = (selector: string) => {
  $(selector)?.classList.add('modal--open');
};

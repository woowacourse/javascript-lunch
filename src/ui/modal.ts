import { $inBody } from '../utils/selector';
import { SELECTOR } from '../constants/selector';
import { resetForm, scrollToTopForm } from './form';

export const handleModalCloseButtonClick = (): void => {
  $inBody(SELECTOR.MODAL)?.classList.remove('modal--open');
  resetForm('#new-restaurant-form');
  scrollToTopForm('.modal-container');
};

export const handleModalOpenButtonClick = (): void => {
  $inBody(SELECTOR.MODAL)?.classList.add('modal--open');
  resetForm('#new-restaurant-form');
  scrollToTopForm('.modal-container');
};

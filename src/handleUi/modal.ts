import { $ } from '../utils/selector';

export const handleModalClose = (selector: string): void => {
  $(selector)?.classList.remove('modal--open');
};

export const handleModalOpen = (selector: string): void => {
  $(selector)?.classList.add('modal--open');
};

import { $ } from '../utils/selector';
import { SELECTOR } from '../constants/selector';

export const handleModalClose = (): void => {
  $(SELECTOR.MODAL)?.classList.remove('modal--open');
};

export const handleModalOpen = (): void => {
  $(SELECTOR.MODAL)?.classList.add('modal--open');
};

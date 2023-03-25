import { resetForm, scrollToTopForm } from './form';
import { handleModalOpen } from './modal';

export const handleHeaderTitleClick = () => {
  window.location.reload();
};

export const handleGNBClick = () => {
  handleModalOpen('#restaurant-add-modal');
  resetForm('#new-restaurant-form');
  scrollToTopForm('.restaurant-add-container');
};

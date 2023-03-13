import { resetForm, scrollToTopForm } from './form';
import { handleModalClose } from './modal';

export const handleNewRestaurantCancelClick = () => {
  handleNewRestaurantClose();
};

export const handleNewRestaurantAddSubmit = () => {
  handleNewRestaurantClose();
};

export const handleBackdropClick = () => {
  handleNewRestaurantClose();
};

const handleNewRestaurantClose = () => {
  handleModalClose('#restaurant-add-modal');
  resetForm('#new-restaurant-form');
  scrollToTopForm('.restaurant-add-container');
};

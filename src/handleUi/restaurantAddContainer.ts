import { resetForm, scrollToTopForm } from './form';
import { handleModalClose } from './modal';

const handleNewRestaurantClose = () => {
  handleModalClose('#restaurant-add-modal');
  resetForm('#new-restaurant-form');
  scrollToTopForm('.restaurant-add-container');
};

export const handleNewRestaurantCancelClick = () => {
  handleNewRestaurantClose();
};

export const handleNewRestaurantAddSubmit = () => {
  handleNewRestaurantClose();
};

export const handleBackdropClick = () => {
  handleNewRestaurantClose();
};

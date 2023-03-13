import { resetForm, scrollToTopForm } from './form';
import { handleModalOpen } from './modal';

export const handleHeaderTitleClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLHeadingElement) {
    window.location.reload();
  }
};

export const handleGNBClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLImageElement) {
    handleModalOpen('#restaurant-add-modal');
    resetForm('#new-restaurant-form');
    scrollToTopForm('.restaurant-add-container');
  }
};

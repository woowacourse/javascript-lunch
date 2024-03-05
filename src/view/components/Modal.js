import { RESTAURANT_FORM_EVENTS } from './RestaurantForm';

export const Modal = () => {
  const modal = document.querySelector('.modal');
  const handleCloseModal = () => {
    modal.classList.remove('modal--open');
  };

  modal.addEventListener(RESTAURANT_FORM_EVENTS.submit, () => handleCloseModal());
  modal.addEventListener(RESTAURANT_FORM_EVENTS.reset, () => handleCloseModal());
};

export default Modal;

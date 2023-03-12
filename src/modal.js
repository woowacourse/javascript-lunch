export const showModal = () => {
  document.body.classList.add('body--modal-open');
  document.querySelector('#modal').classList.add('modal--open');
};

export const closeModal = () => {
  document.body.classList.remove('body--modal-open');
  document.querySelector('#modal').classList.remove('modal--open');
};

export const showRestaurantForm = () => {
  document.querySelector('#modal-info').classList.add('hide');
  document.querySelector('#modal-form').classList.remove('hide');

  showModal();
};

export const showInfo = () => {
  document.querySelector('#modal-info').classList.remove('hide');
  document.querySelector('#modal-form').classList.add('hide');

  showModal();
};

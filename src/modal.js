export const showModal = () => {
  const $modal = document.querySelector('.modal');
  document.body.classList.add('body--modal-open');
  $modal.classList.add('modal--open');
};

export const closeModal = () => {
  const $modal = document.querySelector('.modal');
  document.body.classList.remove('body--modal-open');
  $modal.classList.remove('modal--open');
};

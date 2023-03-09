export const showModal = () => {
  const $modal = document.querySelector('.modal');

  if (!$modal) return;

  document.body.style.overflow = 'hidden';
  $modal.classList.add('modal--open');
};

export const closeModal = () => {
  const $modal = document.querySelector('.modal');

  if (!$modal) return;

  document.body.style.overflow = 'visible';
  $modal.classList.remove('modal--open');
};

export const appendModal = ($content: HTMLElement) => {
  const $modalContainer = document.querySelector('.modal-container');

  if (!$modalContainer) return;

  $modalContainer.innerHTML = '';

  $modalContainer.insertAdjacentElement('beforeend', $content);
};

export const openModal = (selector) => {
  if (selector) {
    selector.classList.add('modal--open');
  }
};

export const closeModal = (selector) => {
  if (selector) {
    selector.classList.remove('modal--open');
  }
};

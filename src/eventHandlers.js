import stateStore from './stateStore.js';

function openModal() {
  const gnbButton = document.querySelector('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    modal.classList.add('modal--open');
  });
}

function closeModal() {
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  closeButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    resetFormAndState();
    modal.classList.remove('modal--open');
  });

  modalBackdrop.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    resetFormAndState();
    modal.classList.remove('modal--open');
  });

  document.addEventListener('keydown', (event) => {
    const modal = document.querySelector('.modal');
    if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
      resetFormAndState();
      modal.classList.remove('modal--open');
    }
  });
}

function readNewRestaurant(addNewRestaurantItem) {
  const modal = document.querySelector('.modal');
  const form = document.querySelector('#new-restaurant-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newRestaurantData = {
      category: document.querySelector('#category').value,
      name: document.querySelector('#name').value,
      distance: document.querySelector('#distance').value.replace('분 내', ''),
      description: document.querySelector('#description').value,
      link: document.querySelector('#link').value,
    };

    stateStore.updateState(newRestaurantData);
    addNewRestaurantItem();
    resetFormAndState();
    modal.classList.remove('modal--open');
  });
}

function resetForm() {
  const form = document.querySelector('#new-restaurant-form');
  form.reset();
}

function resetState() {
  stateStore.initState();
}

function resetFormAndState() {
  resetForm();
  resetState();
}

const eventHandlers = {
  openModal,
  closeModal,
  readNewRestaurant,
};

export default eventHandlers;

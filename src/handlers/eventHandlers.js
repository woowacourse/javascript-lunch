import stateStore from '../store/stateStore.js';

function handleOpenModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('modal--open');
}

function handleCloseModal() {
  const modal = document.querySelector('.modal');
  resetFormAndState();
  modal.classList.remove('modal--open');
}

function handleEscKey(event) {
  const modal = document.querySelector('.modal');
  if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
    handleCloseModal();
  }
}

function handleNewRestaurantSubmit(event, addNewRestaurantItem) {
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
  handleCloseModal();
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

function registerEventHandlers(addNewRestaurantItem) {
  const gnbButton = document.querySelector('.gnb__button');
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');

  gnbButton.addEventListener('click', handleOpenModal);
  closeButton.addEventListener('click', handleCloseModal);
  modalBackdrop.addEventListener('click', handleCloseModal);
  document.addEventListener('keydown', handleEscKey);
  form.addEventListener('submit', (event) => handleNewRestaurantSubmit(event, addNewRestaurantItem));
}

function removeEventHandlers() {
  const gnbButton = document.querySelector('.gnb__button');
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');

  gnbButton.removeEventListener('click', handleOpenModal);
  closeButton.removeEventListener('click', handleCloseModal);
  modalBackdrop.removeEventListener('click', handleCloseModal);
  document.removeEventListener('keydown', handleEscKey);
  form.removeEventListener('submit', handleNewRestaurantSubmit);
}

function removeModalEventHandlers() {
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');

  closeButton.removeEventListener('click', handleCloseModal);
  modalBackdrop.removeEventListener('click', handleCloseModal);
  document.removeEventListener('keydown', handleEscKey);
  form.removeEventListener('submit', handleNewRestaurantSubmit);
}

const eventHandlers = {
  registerEventHandlers,
  removeEventHandlers,
};

export default eventHandlers;

import stateStore from './stateStore.js';

function openModal() {
  const gnbButton = document.querySelector('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    modal.classList.toggle('modal--open');
  });
}

function closeModal() {
  const closeButton = document.querySelector('.button--secondary');

  closeButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    resetFormAndState();
    modal.classList.toggle('modal--open');
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
      distance: document.querySelector('#distance').value,
      description: document.querySelector('#description').value,
      link: document.querySelector('#link').value,
    };

    stateStore.updateState(newRestaurantData);
    addNewRestaurantItem();
    resetFormAndState();
    modal.classList.toggle('modal--open');
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

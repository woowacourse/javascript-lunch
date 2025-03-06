import stateStore from './stateStore.js';

function openModal() {
  const gnbButton = document.querySelector('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');

    modal.classList.add('modal--open');
  });
}

function readNewRestaurant(addNewRestaurantItem) {
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
  });
}

const eventHandlers = {
  openModal,
  readNewRestaurant,
};

export default eventHandlers;

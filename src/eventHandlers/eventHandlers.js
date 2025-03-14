import storeService from '../database/storeService.js';
import filteringRestaurants from '../domain/filteringRestaurants.js';
import sortRestaurants from '../domain/sortRestaurants.js';
import stateStore from '../domain/stateStore.ts';

function openAddRestaurantModal() {
  const gnbButton = document.querySelector('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = document.querySelector('.add-restaurant-modal');

    modal.classList.add('modal--open');
  });
}

function openRestaurantInfoModal(callback) {
  const handleRestaurantClick = (event) => {
    const { target } = event;

    if (!target.closest('.restaurant-list') || target.closest('.restaurant__favorite')) {
      return;
    }

    const targetModal = document.querySelector('.restaurant-info-modal');
    targetModal.classList.add('modal--open');

    const restaurantItem = target.closest('.restaurant');
    const id = Number(restaurantItem.dataset.id);
    callback(id);
  };

  const restaurantList = document.querySelector('.restaurant-list');
  restaurantList.addEventListener('click', handleRestaurantClick);
}

function closeModal() {
  const closeButtons = document.querySelectorAll('.close-modal-button');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  const handleCloseButtonClick = (event) => {
    const targetModal = event.target.closest('.modal');

    resetFormAndState();
    targetModal.classList.remove('modal--open');
  };

  const handleBackdropClick = (event) => {
    const targetModal = event.target.closest('.modal');

    resetFormAndState();
    targetModal.classList.remove('modal--open');
  };

  const handleEscapeKeydown = (event) => {
    const openedModals = document.querySelectorAll('.modal--open');
    if (event.key === 'Escape' && openedModals.length > 0) {
      resetFormAndState();

      const targetModal = openedModals.pop();
      targetModal.classList.remove('modal--open');
    }
  };

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', handleCloseButtonClick);
  });

  modalBackdrops.forEach((modalBackdrop) => {
    modalBackdrop.addEventListener('click', handleBackdropClick);
  });

  document.addEventListener('keydown', handleEscapeKeydown);
}

function readNewRestaurant() {
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

    const id = storeService.getNewRestaurantId();
    storeService.updateRestaurantById(newRestaurantData.id, { ...newRestaurantData, id });
    window.dispatchEvent(new Event('storage'));
    resetFormAndState();
    modal.classList.remove('modal--open');
  });
}

function detectStorageEvent(callback) {
  window.addEventListener('storage', () => {
    callback();
  });
}

function switchTab(callback) {
  let selected;

  const handleTabClick = (event) => {
    const { target } = event;
    const tab = target.closest('.tab-container');
    if (!tab) {
      return;
    }

    if (selected) {
      selected.classList.remove('selected');
    }

    selected = target;
    selected.classList.add('selected');

    callback(target);
  };

  const tabContainer = document.querySelector('.tab-container');
  tabContainer.addEventListener('click', handleTabClick);
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

function sortRestaurantItems(callback) {
  const sortSelector = document.querySelector('#sort-selector');

  sortSelector.addEventListener('change', (event) => {
    const sortKey = event.target.value;
    const restaurantItems = storeService.getRestaurants();
    const sortedRestaurants = sortRestaurants(sortKey, restaurantItems);

    callback(sortedRestaurants);
  });
}

function filteringRestaurantItems(callback) {
  const categoryFilter = document.querySelector('#category-filter');

  categoryFilter.addEventListener('change', (event) => {
    const filteringKey = event.target.value;
    const restaurantItems = storeService.getRestaurants();
    const filteredRestaurants = filteringRestaurants(filteringKey, restaurantItems);

    callback(filteredRestaurants);
  });
}

function toggleFavoriteRestaurant(callback) {
  const handleFavoriteClick = (event) => {
    const { target } = event;

    if (!target.closest('.restaurant__favorite')) {
      return;
    }

    const restaurantItem = target.closest('.restaurant');
    const id = Number(restaurantItem.dataset.id);
    const targetData = storeService.findRestaurantById(id);
    const updateData = { ...targetData, favorite: !targetData.favorite };
    storeService.updateRestaurantById(id, updateData);

    callback();
  };

  const restaurantItems = document.querySelector('.restaurant-list');
  restaurantItems.addEventListener('click', handleFavoriteClick);
}

const eventHandlers = {
  openAddRestaurantModal,
  openRestaurantInfoModal,
  closeModal,
  readNewRestaurant,
  detectStorageEvent,
  switchTab,
  sortRestaurantItems,
  filteringRestaurantItems,
  toggleFavoriteRestaurant,
};

export default eventHandlers;

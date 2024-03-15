import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';
import restaurantCatalog from '../../domain/RestaurantCatalog';

const closeModal = () => {
  const modal = document.getElementById('add-form-modal');
  const form = document.getElementById('add-restaurant-form');

  modal.classList.remove('modal--open');
  modal.classList.add('modal--close');
  form.reset();
};

const openModal = () => {
  const modal = document.getElementById('add-form-modal');

  modal.classList.remove('modal--close');
  modal.classList.add('modal--open');
};

export function addEventToButton() {
  const modalCloseButton = document.getElementById('form-modal-close-button');
  modalCloseButton.addEventListener('click', closeModal);

  const modalOpenButton = document.getElementById('add-restaurant-button');
  modalOpenButton.addEventListener('click', openModal);
}

const makeRestaurantInfo = (target) => {
  const { category, name, distance, description, link } = target;
  return {
    category: category.value,
    name: name.value,
    distanceFromCampus: Number(distance.value),
    description: description.value,
    link: link.value,
  };
};

export const updateRestaurantsToLocalStorage = (...restaurants) => {
  const restaurantArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
  restaurants.forEach((restaurant) => restaurantArr.push(restaurant));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantArr));
};

const reRenderRestaurants = () => {
  const RestaurantList = document.querySelector('.restaurant-list');
  RestaurantList.render();
};

export function executeFormSubmitEvent(restaurantInfo) {
  try {
    const newRestaurant = restaurantCatalog.pushNewRestaurant(restaurantInfo);
    updateRestaurantsToLocalStorage(newRestaurant);
    reRenderRestaurants();
    closeModal();
  } catch (error) {
    alert(error.message);
  }
}

export function addEventToForm() {
  const addForm = document.getElementById('add-restaurant-form');

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const restaurantInfo = makeRestaurantInfo(event.target);
    executeFormSubmitEvent(restaurantInfo);
  });
}

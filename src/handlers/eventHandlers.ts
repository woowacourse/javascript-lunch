import stateStore from '../store/stateStore.ts';
import { restaurantStore, getNextRestaurantId, addRestaurant, deleteRestaurant } from '../store/restaurantStore.ts';
import { updateRestaurantListBasedOnActiveTab } from '../utils/updateRestaurantList.ts';

function handleOpenModal() {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  modal.classList.add('modal--open');
}

function handleCloseModal(event: Event) {
  const target = event.target as HTMLElement;
  const modal = target.closest('.modal');
  resetFormAndState();
  if (!modal) return;
  modal.classList.remove('modal--open');
}

function handleEscKey(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;

  const openModals = document.querySelectorAll('.modal.modal--open');

  openModals.forEach((modal) => {
    modal.classList.remove('modal--open');
  });

  resetFormAndState();
}

function handleNewRestaurantSubmit(event: SubmitEvent, addNewRestaurantItem: () => void) {
  event.preventDefault();

  const categoryElement = document.querySelector('#category');
  const nameElement = document.querySelector('#name');
  const distanceElement = document.querySelector('#distance');
  const descriptionElement = document.querySelector('#description');
  const linkElement = document.querySelector('#link');

  if (
    categoryElement instanceof HTMLSelectElement &&
    nameElement instanceof HTMLInputElement &&
    distanceElement instanceof HTMLSelectElement &&
    descriptionElement instanceof HTMLTextAreaElement &&
    linkElement instanceof HTMLInputElement
  ) {
    const newRestaurantData = {
      id: getNextRestaurantId(),
      category: categoryElement.value,
      name: nameElement.value,
      distance: Number(distanceElement.value.replace('분 내', '')),
      description: descriptionElement.value,
      link: linkElement.value,
      isFavorite: false,
    };

    addRestaurant(newRestaurantData);
    stateStore.updateState(newRestaurantData);
    addNewRestaurantItem();
    handleCloseModal(event);
    updateRestaurantListBasedOnActiveTab();
  }
}

function resetForm() {
  const form = document.querySelector('#new-restaurant-form');
  if (form instanceof HTMLFormElement) {
    form.reset();
  }
}

function resetState() {
  stateStore.initState();
}

function resetFormAndState() {
  resetForm();
  resetState();
}

export function handleStarToggle(event: Event) {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;

  const restaurantId = target.getAttribute('data-id');
  if (!restaurantId) return;

  const idNumber = Number(restaurantId);
  const restaurant = restaurantStore.find((item) => item.id === idNumber);
  if (!restaurant) return;

  restaurant.isFavorite = !restaurant.isFavorite;
  const newSrc = restaurant.isFavorite ? 'favorite-icon-filled.png' : 'favorite-icon-lined.png';

  target.src = newSrc;

  const mainIcon = document.querySelector(`.restaurant[data-id="${restaurantId}"] .favorite-star`);
  if (mainIcon && mainIcon !== target && mainIcon instanceof HTMLImageElement) {
    mainIcon.src = newSrc;
  }

  const modalIcon = document.querySelector(`.modal .favorite-star[data-id="${restaurantId}"]`);
  if (modalIcon && modalIcon !== target && modalIcon instanceof HTMLImageElement) {
    modalIcon.src = newSrc;
  }

  updateRestaurantListBasedOnActiveTab();
}

function handleRestaurantClick(
  event: Event,
  openModal: (data: {
    id: number;
    category: string;
    name: string;
    distance: string;
    description: string;
    image: string;
    isFavorite: boolean;
    link: string;
  }) => void,
) {
  const target = event.target as HTMLElement;
  const restaurantItem = target.closest('.restaurant');

  if (!restaurantItem) return;

  const restaurantId = Number(restaurantItem.getAttribute('data-id') ?? 0);

  const altValue = restaurantItem.querySelector('.category-icon')?.getAttribute('alt') ?? '';
  const restaurantName = restaurantItem.querySelector('.restaurant__name')?.textContent ?? '';
  const restaurantDistance = restaurantItem.querySelector('.restaurant__distance')?.textContent ?? '';
  const numericValue = restaurantDistance.match(/\d+/)?.[0] ?? '';
  const restaurantDescription = restaurantItem.querySelector('.restaurant__description')?.textContent ?? '';
  const restaurantImage = restaurantItem.querySelector('.category-icon')?.getAttribute('src') ?? '';

  const favoriteStar = restaurantItem.querySelector('.favorite-star') as HTMLImageElement;
  const isFavorite = favoriteStar?.getAttribute('src')?.includes('favorite-icon-filled.png') ?? false;

  const restaurantLink = restaurantItem.querySelector('.restaurant__link')?.getAttribute('href') ?? '';

  openModal({
    id: restaurantId,
    category: altValue,
    name: restaurantName,
    distance: numericValue,
    description: restaurantDescription,
    image: restaurantImage,
    isFavorite: isFavorite,
    link: restaurantLink,
  });

  const closeBtn = document.querySelector('.close-button');
  if (closeBtn) {
    closeBtn.addEventListener('click', handleCloseModal);
  }

  const deleteBtn = document.querySelector('.delete-button');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', (event) => handleRestaurantDelete(restaurantId, event));
  }
}

export function handleRestaurantDelete(restaurantId: number, event: Event): void {
  deleteRestaurant(restaurantId);
  updateRestaurantListBasedOnActiveTab();
  handleCloseModal(event);
}

let formSubmitHandler: (event: SubmitEvent) => void;

function registerEventHandlers(
  addNewRestaurantItem: () => void,
  openRestaurantModal: (data: {
    id: number;
    category: string;
    name: string;
    distance: string;
    description: string;
    image: string;
    isFavorite: boolean;
    link: string;
  }) => void,
) {
  const gnbButton = document.querySelector('.gnb__button');
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelectorAll('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');
  if (!gnbButton || !closeButton || !modalBackdrop || !(form instanceof HTMLFormElement)) return;

  gnbButton.addEventListener('click', handleOpenModal);
  closeButton.addEventListener('click', handleCloseModal);
  modalBackdrop.forEach((backdrop) => backdrop.addEventListener('click', handleCloseModal));
  document.addEventListener('keydown', handleEscKey);
  formSubmitHandler = (event: SubmitEvent) => handleNewRestaurantSubmit(event, addNewRestaurantItem);
  form.addEventListener('submit', formSubmitHandler);

  const restaurantList = document.querySelector('.restaurant-list');

  if (restaurantList) {
    restaurantList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('favorite-star')) {
        handleStarToggle(event);
        return;
      }

      const restaurantItem = target.closest('.restaurant');
      if (restaurantItem) {
        handleRestaurantClick(event, openRestaurantModal);
      }
    });
  }
}

function removeEventHandlers() {
  const gnbButton = document.querySelector('.gnb__button');
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');

  if (!gnbButton || !closeButton || !modalBackdrop || !(form instanceof HTMLFormElement)) return;

  gnbButton.removeEventListener('click', handleOpenModal);
  closeButton.removeEventListener('click', handleCloseModal);
  modalBackdrop.removeEventListener('click', handleCloseModal);
  document.removeEventListener('keydown', handleEscKey);
  form.removeEventListener('submit', formSubmitHandler);
}

const eventHandlers = {
  registerEventHandlers,
  removeEventHandlers,
};

export default eventHandlers;

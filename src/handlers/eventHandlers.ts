import stateStore from '../store/stateStore.ts';

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
  const modal = document.querySelector('.modal');
  if (!modal) return;
  if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
    handleCloseModal(event);
  }
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
      category: categoryElement.value,
      name: nameElement.value,
      distance: Number(distanceElement.value.replace('분 내', '')),
      description: descriptionElement.value,
      link: linkElement.value,
    };

    stateStore.updateState(newRestaurantData);
    addNewRestaurantItem();
    handleCloseModal(event);
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
  if (target instanceof HTMLImageElement) {
    const isActive = target.src.includes('favorite-icon-filled.png');
    target.src = isActive ? 'favorite-icon-lined.png' : 'favorite-icon-filled.png';
  }
}

function handleRestaurantClick(
  event: Event,
  openModal: (data: {
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

  const altValue = restaurantItem.querySelector('.category-icon')?.getAttribute('alt') || '';
  console.log(altValue);
  const restaurantName = restaurantItem.querySelector('.restaurant__name')?.textContent || '';
  const restaurantDistance = restaurantItem.querySelector('.restaurant__distance')?.textContent || '';
  const numericValue = restaurantDistance.match(/\d+/)?.[0] || '';
  const restaurantDescription = restaurantItem.querySelector('.restaurant__description')?.textContent || '';
  const restaurantImage = restaurantItem.querySelector('.category-icon')?.getAttribute('src') || '';

  const favoriteStar = restaurantItem.querySelector('.favorite-star') as HTMLImageElement;
  const isFavorite = favoriteStar?.getAttribute('src')?.includes('favorite-icon-filled.png') || false;

  const restaurantLink = restaurantItem.querySelector('.restaurant__link')?.getAttribute('href') || '';

  openModal({
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
}

let formSubmitHandler: (event: SubmitEvent) => void;

function registerEventHandlers(
  addNewRestaurantItem: () => void,
  openRestaurantModal: (data: {
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

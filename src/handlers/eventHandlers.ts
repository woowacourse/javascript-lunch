import stateStore from '../store/stateStore.ts';

function handleOpenModal() {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  modal.classList.add('modal--open');
}

function handleCloseModal() {
  const modal = document.querySelector('.modal');
  resetFormAndState();
  if (!modal) return;
  modal.classList.remove('modal--open');
}

function handleEscKey(event: KeyboardEvent) {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
    handleCloseModal();
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
    handleCloseModal();
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

let formSubmitHandler: (event: SubmitEvent) => void;

function registerEventHandlers(addNewRestaurantItem: () => void) {
  const gnbButton = document.querySelector('.gnb__button');
  const closeButton = document.querySelector('.button--secondary');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.querySelector('#new-restaurant-form');
  if (!gnbButton || !closeButton || !modalBackdrop || !(form instanceof HTMLFormElement)) return;

  gnbButton.addEventListener('click', handleOpenModal);
  closeButton.addEventListener('click', handleCloseModal);
  modalBackdrop.addEventListener('click', handleCloseModal);
  document.addEventListener('keydown', handleEscKey);
  formSubmitHandler = (event: SubmitEvent) => handleNewRestaurantSubmit(event, addNewRestaurantItem);
  form.addEventListener('submit', formSubmitHandler);
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

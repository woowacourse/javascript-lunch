import validateRestaurantState from '../../../services/validateRestaurantState';
import restaurantStateStore from '../../../store/RestaurantStateStore';
import { InvalidResult, RestaurantState } from '../../../types';
import RestaurantList from '../../restaurantList/RestaurantList';
import localStorageHandler from '../../../services/localStorageHandler';

export const initializeModal = () => {
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  modalContainer.innerHTML = '';
  modal.classList.remove('modal--open');
};

const initializeFormState = () => {
  restaurantStateStore.resetState();
};

const addNewRestaurant = (modal: Element, restaurantInfo: RestaurantState) => {
  const invalidMessage = document.getElementsByClassName('invalid_message');

  if (invalidMessage.length === 0) {
    localStorageHandler('restaurantList').set(restaurantInfo);
    initializeFormState();
    initializeModal();
    window.location.reload();
  }
};

const removePrevErrorMessage = () => {
  const prevMessages = document.querySelectorAll('.invalid_message');

  prevMessages.forEach((msg) => {
    if (msg && msg.parentNode) {
      msg.parentNode.removeChild(msg);
    }
  });
};

const renderErrorMessage = (index: number, result: Partial<InvalidResult>) => {
  const targetTag = document.getElementsByClassName('form-item')[index];
  const p = document.createElement('p');
  p.setAttribute('class', `invalid_message ${result.targetClassName}`);
  p.textContent = result.errorMessage as string;
  targetTag.appendChild(p);
};

const checkValidateHandler = (restaurantInfo: Partial<RestaurantState>) => {
  const validateResult = validateRestaurantState(restaurantInfo);
  removePrevErrorMessage();

  validateResult.forEach((result, index) => {
    if (!result.success) {
      renderErrorMessage(index, result);
    }
  });
};

const validateAndAddNewRestaurant = (modal: Element, restaurantInfo: RestaurantState) => {
  checkValidateHandler(restaurantInfo);
  addNewRestaurant(modal, restaurantInfo as RestaurantState);
};

const addNewRestaurantButtonHandler = (event: Event, modal: Element) => {
  event.preventDefault();
  const restaurantInfo = restaurantStateStore.getRestaurantField();
  validateAndAddNewRestaurant(modal, restaurantInfo as RestaurantState);
  const allRestaunrants = localStorageHandler('restaurantList').get()!;
  RestaurantList(allRestaunrants ?? []);
  initializeFormState();
};

export const submitHandler = () => {
  const submitButton = document.getElementsByClassName('button--primary')[0];
  const modal = document.getElementsByClassName('modal')[0];
  submitButton.addEventListener('click', (event) => addNewRestaurantButtonHandler(event, modal));
};

export const cancelHandler = () => {
  const cancelButton = document.getElementsByClassName('button--secondary')[0];

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    initializeFormState();
    initializeModal();
  });
};

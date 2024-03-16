import AddRestaurantForm from '../addRestaurantForm/AddRestaurantForm';
import addNewRestaurantFormEventHandler from '../addRestaurantForm/eventHandlers';

const modalOpenButtonHandler = () => {
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  const addRestaurantFormElements = AddRestaurantForm();
  modal.classList.add('modal--open');
  modalContainer.appendChild(addRestaurantFormElements);
  addNewRestaurantFormEventHandler();
};

const modalOpenHandler = () => {
  const openButton = document.getElementsByClassName('gnb__button')[0];

  openButton.addEventListener('click', modalOpenButtonHandler);
};
export default modalOpenHandler;

import AddRestaurantForm from '../addRestaurantForm/AddRestaurantForm';
import addNewRestaurantFormEventHandler from '../addRestaurantForm/eventHandlers';

const modalOpenHandler = () => {
  const openButton = document.getElementsByClassName('gnb__button')[0];
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];

  openButton.addEventListener('click', () => {
    const addRestaurantFormElements = AddRestaurantForm();
    modal.classList.add('modal--open');
    modalContainer.appendChild(addRestaurantFormElements);

    addNewRestaurantFormEventHandler();
  });
};
export default modalOpenHandler;

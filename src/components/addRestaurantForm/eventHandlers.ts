import inputNameHandler from '../modal/inputName/eventHandlers';
import inputRestaurantLinkHandler from '../modal/inputLink/eventHandlers';
import inputDescriptionHandler from '../modal/inputDescription/eventHandlers';
import { submitHandler, cancelHandler } from '../modal/modalButton/eventHandlers';
import categoryChange from '../modal/selectCategory/eventHandlers';
import distanceChange from '../modal/selectDistance/eventHandlers';
import dimmerClickHandler from '../modal/eventHandlers';

const addNewRestaurantFormEventHandler = () => {
  inputNameHandler();
  inputRestaurantLinkHandler();
  inputDescriptionHandler();
  submitHandler();
  cancelHandler();
  categoryChange();
  distanceChange();
  dimmerClickHandler();
};

export default addNewRestaurantFormEventHandler;

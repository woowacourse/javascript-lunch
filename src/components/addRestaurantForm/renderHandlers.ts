import generateHeadingComponent from '../../uiUtils/generateHeadingComponent';
import {
  ADD_RESTAURANT_FORM_H2_COMPONENT_DATA,
  ADD_RESTAURANT_FORM_COMPONENT_DATA,
} from './componentsData/AddRestaurantFormComponentDatat';
import generateFormComponent from '../../uiUtils/generateFormComponent';
import SelectCategory from '../modal/selectCategory/SelectCategory';
import InputName from '../modal/inputName/InputName';
import SelectDistance from '../modal/selectDistance/SelectDistance';
import InputDescription from '../modal/inputDescription/InputDescription';
import InputLink from '../modal/inputLink/InputLink';
import ModalButton from '../modal/modalButton/ModalButton';

const rendereAddNewRestaurantFormElements = () => {
  const selectCategory = SelectCategory();
  const inputName = InputName();
  const selectDistance = SelectDistance();
  const inputDescription = InputDescription();
  const inputLink = InputLink();
  const modalButton = ModalButton();

  return { selectCategory, inputName, selectDistance, inputDescription, inputLink, modalButton };
};

const renderAddNewRestaurantForm = () => {
  const h2Component = generateHeadingComponent(ADD_RESTAURANT_FORM_H2_COMPONENT_DATA);
  const formComponent = generateFormComponent(ADD_RESTAURANT_FORM_COMPONENT_DATA);
  const formElements = rendereAddNewRestaurantFormElements();
  const elementsToAdd = [h2Component, ...Object.values(formElements)];
  elementsToAdd.forEach((element) => {
    formComponent.appendChild(element);
  });
  return formComponent;
};

export default renderAddNewRestaurantForm;

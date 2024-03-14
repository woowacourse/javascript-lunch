import generateHeadingComponent from '../../uiUtils/generateHeadingComponent';
import ADD_RESTAURANT_FORM_H2_COMPONENT_DATA from './componentsData/addRestaurantFormH2ComponentData';
import generateFormComponent from '../../uiUtils/generateFormComponent';
import ADD_RESTAURANT_FORM_COMPONENT_DATA from './componentsData/addRestaurantFormComponentData';
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
  const { selectCategory, inputName, selectDistance, inputDescription, inputLink, modalButton } =
    rendereAddNewRestaurantFormElements();
  formComponent.appendChild(h2Component);
  formComponent.appendChild(selectCategory);
  formComponent.appendChild(inputName);
  formComponent.appendChild(selectDistance);
  formComponent.appendChild(inputDescription);
  formComponent.appendChild(inputLink);
  formComponent.appendChild(modalButton);

  return formComponent;
};

export default renderAddNewRestaurantForm;

// <h2 class="modal-title text-title">새로운 음식점</h2>
// <form id="modal-form" class="modal-form"></form>

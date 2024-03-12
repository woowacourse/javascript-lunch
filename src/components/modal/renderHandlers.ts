import dimmerClickHandler from './eventHandlers';
import InputDescription from './inputDescription/InputDescription';
import InputLink from './inputLink/InputLink';
import InputName from './inputName/InputName';
import ModalButton from './modalButton/ModalButton';
import SelectCategory from './selectCategory/SelectCategory';
import SelectDistance from './selectDistance/SelectDistance';

const renderModalForm = (form: Element) => {
  SelectCategory(form);
  InputName(form);
  SelectDistance(form);
  InputDescription(form);
  InputLink(form);
};

const renderModalContent = () => {
  const modal = document.getElementsByClassName('modal')[0];
  const form = document.getElementsByClassName('modal-form')[0];

  renderModalForm(form);

  ModalButton(modal, form);
  dimmerClickHandler(modal);
};

export default renderModalContent;

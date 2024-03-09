import { cancelHandler, submitHandler } from './handlers';
import { renderBaseComponents, renderButtonComponents } from './renderHandler';

function ModalButton(modal: Element, form: Element) {
  renderBaseComponents(form);
  renderButtonComponents();

  submitHandler(modal);
  cancelHandler(modal);
}

export default ModalButton;

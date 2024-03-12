import { cancelHandler, submitHandler } from './eventHandlers';
import { renderBaseModalButtonComponents, renderButtonComponents } from './renderHandler';

function ModalButton(modal: Element, form: Element) {
  renderBaseModalButtonComponents(form);
  renderButtonComponents();

  submitHandler(modal);
  cancelHandler(modal);
}

export default ModalButton;

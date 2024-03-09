import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import { cancelHandler, submitHandler } from './handlers';
import modalButtonTemplate from './modalButtonTemplate';

function ModalButton(modal: Element, form: Element) {
  form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));

  submitHandler(modal);
  cancelHandler(modal);
}

export default ModalButton;

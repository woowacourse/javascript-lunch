import ADD_BUTTON_COMPONENT_DATA from '../../../constants/AddButtonComponentData';
import CANCEL_BUTTON_COMPONENT_DATA from '../../../constants/CancelButtonComponentData';
import generateButtonComponent from '../../../uiUtils/generateButtonComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import modalButtonTemplate from './modalButtonTemplate';

export const renderBaseComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));
};

export const renderButtonComponents = () => {
  const buttonContainer = document.getElementsByClassName('button-container')[0];
  buttonContainer.appendChild(generateButtonComponent(CANCEL_BUTTON_COMPONENT_DATA));
  buttonContainer.appendChild(generateButtonComponent(ADD_BUTTON_COMPONENT_DATA));
};

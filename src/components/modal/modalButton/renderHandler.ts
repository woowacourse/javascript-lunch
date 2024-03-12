import generateButtonComponent from '../../../uiUtils/generateButtonComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import ADD_BUTTON_COMPONENT_DATA from './componentsData/AddButtonComponentData';
import CANCEL_BUTTON_COMPONENT_DATA from './componentsData/CancelButtonComponentData';
import modalButtonTemplate from './modalButtonTemplate';

export const renderBaseModalButtonComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));
};

export const renderButtonComponents = () => {
  const buttonContainer = document.getElementsByClassName('button-container')[0];
  buttonContainer.appendChild(generateButtonComponent(CANCEL_BUTTON_COMPONENT_DATA));
  buttonContainer.appendChild(generateButtonComponent(ADD_BUTTON_COMPONENT_DATA));
};

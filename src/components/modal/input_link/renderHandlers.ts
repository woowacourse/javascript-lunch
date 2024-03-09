import LINK_LABEL_COMPONENT_DATA from '../../../constants/LinkLabelComponentData';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import inputLinkTemplate from './inputLinkTemplate';

export const renderBaseComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));
};

export const renderLinkComponents = () => {
  const formContainer = document.getElementsByClassName('form-item')[0];

  formContainer.appendChild(generateLabelComponent(LINK_LABEL_COMPONENT_DATA));
};

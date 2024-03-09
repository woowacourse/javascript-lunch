import NAME_INPUT_COMPONENT_DATA from '../../../constants/NameInputComponentData';
import NAME_LABEL_COMPONENT_DATA from '../../../constants/NameLabelComponentData';
import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import inputNameTemplate from './inputNameTemplate';

export const renderBaseComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputNameTemplate));
};

export const renderInputComponents = () => {
  const formItem = document.getElementsByClassName('form-item')[1];

  formItem.appendChild(generateLabelComponent(NAME_LABEL_COMPONENT_DATA));
  formItem.appendChild(generateInputComponent(NAME_INPUT_COMPONENT_DATA));
};

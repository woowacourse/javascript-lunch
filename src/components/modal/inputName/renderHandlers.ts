import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import NAME_INPUT_COMPONENT_DATA from './componentsData/NameInputComponentData';
import NAME_LABEL_COMPONENT_DATA from './componentsData/NameLabelComponentData';
import inputNameTemplate from './inputNameTemplate';

export const renderBaseComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputNameTemplate));
};

export const renderInputComponents = () => {
  const nameContainer = document.getElementsByClassName('name-container')[0];

  nameContainer.appendChild(generateLabelComponent(NAME_LABEL_COMPONENT_DATA));
  nameContainer.appendChild(generateInputComponent(NAME_INPUT_COMPONENT_DATA));
};

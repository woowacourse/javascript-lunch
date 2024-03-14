import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import NAME_INPUT_COMPONENT_DATA from './componentsData/NameInputComponentData';
import NAME_LABEL_COMPONENT_DATA from './componentsData/NameLabelComponentData';
import INPUT_NAME_CONTAINER_COMPONENT_DATA from './componentsData/inputNameContainerComponentData';
import generateContainerComponent from '../../../uiUtils/generateContainerComponent';

export const renderInputComponents = () => {
  const inputNameContainer = generateContainerComponent(INPUT_NAME_CONTAINER_COMPONENT_DATA);

  inputNameContainer.appendChild(generateLabelComponent(NAME_LABEL_COMPONENT_DATA));
  inputNameContainer.appendChild(generateInputComponent(NAME_INPUT_COMPONENT_DATA));

  return inputNameContainer;
};

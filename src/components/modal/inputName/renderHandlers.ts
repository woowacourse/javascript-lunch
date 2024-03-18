import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';

import {
  NAME_INPUT_COMPONENT_DATA,
  NAME_LABEL_COMPONENT_DATA,
  NAME_INPUT_CONTAINER_COMPONENT_DATA,
} from './componentsData/NameInputComponentData';

import generateContainerComponent from '../../../uiUtils/generateContainerComponent';

const renderInputComponents = () => {
  const inputNameContainer = generateContainerComponent(NAME_INPUT_CONTAINER_COMPONENT_DATA);

  inputNameContainer.appendChild(generateLabelComponent(NAME_LABEL_COMPONENT_DATA));
  inputNameContainer.appendChild(generateInputComponent(NAME_INPUT_COMPONENT_DATA));

  return inputNameContainer;
};

export default renderInputComponents;

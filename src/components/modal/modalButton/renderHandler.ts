import generateContainerComponent from '../../../uiUtils/generateContainerComponent';
import generateButtonComponent from '../../../uiUtils/generateButtonComponent';

import {
  MODAL_BUTTON_CONTAINER_COMPONENT_DATA,
  ADD_BUTTON_COMPONENT_DATA,
  CANCEL_BUTTON_COMPONENT_DATA,
} from './componentsData/ModalButtonComponentData';

const renderButtonComponents = () => {
  const buttonContainer = generateContainerComponent(MODAL_BUTTON_CONTAINER_COMPONENT_DATA);
  buttonContainer.appendChild(generateButtonComponent(CANCEL_BUTTON_COMPONENT_DATA));
  buttonContainer.appendChild(generateButtonComponent(ADD_BUTTON_COMPONENT_DATA));

  return buttonContainer;
};

export default renderButtonComponents;

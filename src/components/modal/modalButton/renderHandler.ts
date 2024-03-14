import generateContainerComponent from '../../../uiUtils/generateContainerComponent';
import generateButtonComponent from '../../../uiUtils/generateButtonComponent';

import MODAL_BUTTON_CONTAINER_COMPONENT_DATA from './componentsData/modalButtonContainerComponentData';
import ADD_BUTTON_COMPONENT_DATA from './componentsData/AddButtonComponentData';
import CANCEL_BUTTON_COMPONENT_DATA from './componentsData/CancelButtonComponentData';

const renderButtonComponents = () => {
  const buttonContainer = generateContainerComponent(MODAL_BUTTON_CONTAINER_COMPONENT_DATA);
  buttonContainer.appendChild(generateButtonComponent(CANCEL_BUTTON_COMPONENT_DATA));
  buttonContainer.appendChild(generateButtonComponent(ADD_BUTTON_COMPONENT_DATA));

  return buttonContainer;
};

export default renderButtonComponents;

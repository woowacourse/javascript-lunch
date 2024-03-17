import generateContainerComponent from '../../../uiUtils/generateContainerComponent';
import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSpanComponent from '../../../uiUtils/generateSpanComponent';

import {
  LINK_INPUT_CONTAINER_COMPONENT_DATA,
  LINK_INPUT_COMPONENT_DATA,
  LINK_LABEL_COMPONENT_DATA,
  LINK_SPAN_COMPONENT_DATA,
} from './componentsData/LinkInputContainerComponentData';

const renderLinkComponents = () => {
  const linkContainer = generateContainerComponent(LINK_INPUT_CONTAINER_COMPONENT_DATA);

  linkContainer.appendChild(generateLabelComponent(LINK_LABEL_COMPONENT_DATA));
  linkContainer.appendChild(generateInputComponent(LINK_INPUT_COMPONENT_DATA));
  linkContainer.appendChild(generateSpanComponent(LINK_SPAN_COMPONENT_DATA));

  return linkContainer;
};

export default renderLinkComponents;

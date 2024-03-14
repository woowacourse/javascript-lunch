import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSpanComponent from '../../../uiUtils/generateSpanComponent';
import generateTextAreaComponent from '../../../uiUtils/generateTextAreaComponent';
import generateContainerComponent from '../../../uiUtils/generateContainerComponent';

import DESCRIPTION_CONTAINER_COMPONENT_DATA from './componentsData/descriptionContainerComponentData';
import DESCRIPTION_LABEL_COMPONENT_DATA from './componentsData/DescriptionLabelComponentData';
import DESCRIPTION_SPAN_COMPONENT_DATA from './componentsData/DescriptionSpanComponentData';
import DESCRIPTION_TEXT_AREA_COMPONENT_DATA from './componentsData/DescriptionTextAreaComponentData';

const renderDescriptionComponent = () => {
  const descriptionContainer = generateContainerComponent(DESCRIPTION_CONTAINER_COMPONENT_DATA);

  descriptionContainer.appendChild(generateLabelComponent(DESCRIPTION_LABEL_COMPONENT_DATA));
  descriptionContainer.appendChild(generateTextAreaComponent(DESCRIPTION_TEXT_AREA_COMPONENT_DATA));
  descriptionContainer.appendChild(generateSpanComponent(DESCRIPTION_SPAN_COMPONENT_DATA));

  return descriptionContainer;
};

export default renderDescriptionComponent;

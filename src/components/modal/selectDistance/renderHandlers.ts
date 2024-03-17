import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';
import generateContainerComponent from '../../../uiUtils/generateContainerComponent';

import {
  SELECT_DISTANCE_COMPONENT_DATA,
  DISTANCE_LABEL_COMPONENT_DATA,
  DISTANCE_CONTAINER_COMPONENT_DATA,
} from './componentsData/SelectDistanceComponentData';

const renderDistanceSelectComponent = () => {
  const distanceContainer = generateContainerComponent(DISTANCE_CONTAINER_COMPONENT_DATA);

  distanceContainer.appendChild(generateLabelComponent(DISTANCE_LABEL_COMPONENT_DATA));
  distanceContainer.appendChild(generateSelectComponent(SELECT_DISTANCE_COMPONENT_DATA));

  return distanceContainer;
};

export default renderDistanceSelectComponent;

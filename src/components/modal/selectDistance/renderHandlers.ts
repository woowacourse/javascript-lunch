import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import DISTANCE_LABEL_COMPONENT_DATA from './componentsData/DistanceLabelComponentData';
import SELECT_DISTANCE_COMPONENT_DATA from './componentsData/SelectDistanceComponentData';
import selectDistanceTemplate from './selectDistanceTemplate';

export const renderBaseDistanceComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));
};

export const renderDistanceSelectComponent = () => {
  const distanceContainer = document.getElementsByClassName('distance-container')[0];

  distanceContainer.appendChild(generateLabelComponent(DISTANCE_LABEL_COMPONENT_DATA));
  distanceContainer.appendChild(generateSelectComponent(SELECT_DISTANCE_COMPONENT_DATA));
};

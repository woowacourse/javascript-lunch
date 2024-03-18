import generateSelectElement from '../../uiUtils/generateSelectComponent';
import {
  RESTAURANT_CATEGORY_DATA,
  FILTER_BAR_SECTION_COMPONENT_DATA,
  SORT_BY_NAME_OR_CATEGORY_DATA,
} from './componentsData/FilterBarComponentData';

import generateSectionComponent from '../../uiUtils/generateSectionComponent';

const renderFilterBarComponents = () => {
  const barContainer = generateSectionComponent(FILTER_BAR_SECTION_COMPONENT_DATA);

  barContainer.appendChild(generateSelectElement(RESTAURANT_CATEGORY_DATA));
  barContainer.appendChild(generateSelectElement(SORT_BY_NAME_OR_CATEGORY_DATA));

  return barContainer;
};

export default renderFilterBarComponents;

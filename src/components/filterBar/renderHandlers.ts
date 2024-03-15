import generateSelectElement from '../../uiUtils/generateSelectComponent';

import RESTAURANT_CATEGORY_DATA from './componentsData/RestaurantCategoryData';
import SORT_BY_NAME_OR_CATEGORY_DATA from './componentsData/SortByNameOrDistanceData';
import FILTER_BAR_SECTION_COMPONENT_DATA from './componentsData/filterBarSectionComponentData';
import generateSectionComponent from '../../uiUtils/generateSectionComponent';

const renderFilterBarComponents = () => {
  const barContainer = generateSectionComponent(FILTER_BAR_SECTION_COMPONENT_DATA);

  barContainer.appendChild(generateSelectElement(RESTAURANT_CATEGORY_DATA));
  barContainer.appendChild(generateSelectElement(SORT_BY_NAME_OR_CATEGORY_DATA));

  return barContainer;
};

export default renderFilterBarComponents;

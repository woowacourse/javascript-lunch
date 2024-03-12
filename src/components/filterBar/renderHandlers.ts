import generateSelectElement from '../../uiUtils/generateSelectComponent';
import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';

import RESTAURANT_CATEGORY_DATA from './componentsData/RestaurantCategoryData';
import SORT_BY_NAME_OR_CATEGORY_DATA from './componentsData/SortByNameOrDistanceData';
import baseSectionTemplate from './filterBarTemplate';

export const renderBaseFilterBarComponents = () => {
  const formattedBaseSectionTemplate = convertHTMLStringToDOM(baseSectionTemplate);

  document.body.appendChild(formattedBaseSectionTemplate);
};

export const renderFilterBarComponents = () => {
  const barContainer = document.getElementsByClassName('restaurant-filter-container')[0];

  barContainer.appendChild(generateSelectElement(RESTAURANT_CATEGORY_DATA));
  barContainer.appendChild(generateSelectElement(SORT_BY_NAME_OR_CATEGORY_DATA));
};

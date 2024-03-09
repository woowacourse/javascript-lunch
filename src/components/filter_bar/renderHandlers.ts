import RESTAURANT_CATEGORY_DATA from '../../constants/RestaurantCategoryData';
import SORT_BY_NAME_OR_CATEGORY_DATA from '../../constants/SortByNameOrDistanceData';
import generateSelectElement from '../../uiUtils/generateSelectComponent';
import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';

import { baseSectionTemplate } from './filterBarTemplate';

export const renderBaseComponents = () => {
  const formattedBaseSectionTemplate = convertHTMLStringToDOM(baseSectionTemplate);

  document.body.appendChild(formattedBaseSectionTemplate);
};

export const renderFilterBarComponents = () => {
  const barContainer = document.getElementsByClassName('restaurant-filter-container')[0];

  barContainer.appendChild(generateSelectElement(RESTAURANT_CATEGORY_DATA));
  barContainer.appendChild(generateSelectElement(SORT_BY_NAME_OR_CATEGORY_DATA));
};

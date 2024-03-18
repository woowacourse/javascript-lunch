import { RestaurantState } from '../../types';
import RestaurantListItem from '../restaurantListItem/RestaurantListItem';
import generateUlTagComponent from '../../uiUtils/generateUlTagComponent';
import UL_CONTAINER_COMPONENT_DATA from './componentsData/ulContainerComponentData';
import generateSectionComponent from '../../uiUtils/generateSectionComponent';
import UL_SECTION_COMPONENT_DATA from './componentsData/ulSectionComponentData';

export const resetPrevRestaurantList = (ul: Element) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const generateUlSection = () => {
  const ulSection = generateSectionComponent(UL_SECTION_COMPONENT_DATA);
  const ul = generateUlTagComponent(UL_CONTAINER_COMPONENT_DATA);

  ulSection.appendChild(ul);

  return { ulSection, ul };
};

const appendRestaurantListDataToFragment = (filterData: RestaurantState[]) => {
  const fragment = document.createDocumentFragment();
  filterData.map((restaurant) => fragment.appendChild(RestaurantListItem(restaurant)));

  return fragment;
};

export const renderRestaurantList = (filterData: RestaurantState[]) => {
  const { ulSection, ul } = generateUlSection();
  const restaurantList = appendRestaurantListDataToFragment(filterData);
  resetPrevRestaurantList(ul);

  ul.appendChild(restaurantList);
  ulSection.appendChild(ul);

  return ulSection;
};

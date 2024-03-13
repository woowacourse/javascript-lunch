import { RestaurantState } from '../../types';
import RestaurantListItem from '../restaurantListItem/RestaurantListItem';

const resetPrevRestaurantList = (ul: Element) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const renderRestaurantList = (filterData: RestaurantState[]) => {
  const ul = document.getElementsByClassName('restaurant-list')[0];
  resetPrevRestaurantList(ul);
  const fragment = document.createDocumentFragment();
  filterData.map((restaurant) => {
    fragment.appendChild(RestaurantListItem(restaurant));
  });

  ul.appendChild(fragment);
};
export default renderRestaurantList;

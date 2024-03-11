import { RestaurantState } from '../../types';
import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';
import Restaurant from '../restaurant/Restaurant';

const resetPrevRestaurantList = (ul: Element) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const render = (filterData: RestaurantState[]) => {
  const ul = document.getElementsByClassName('restaurant-list')[0];
  resetPrevRestaurantList(ul);
  const totalText = filterData.reduce((acc: string, cur: RestaurantState) => acc + Restaurant(cur), '');
  const formattedTotalText = convertHTMLStringToDOM(totalText);

  if (formattedTotalText) ul.appendChild(formattedTotalText);
};
export default render;

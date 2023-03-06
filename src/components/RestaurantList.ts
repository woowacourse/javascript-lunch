import { IRestaurant } from '../domain/RestaurantListItem';
import Restaurant from './Restaurant';

const RestaurantList = {
  template(restaurantList: IRestaurant[]) {
    return `<ul class='restaurant-list'>
    ${restaurantList.map((restaurant) => Restaurant.template(restaurant)).join('')}
    </ul>`;
  },
};

export default RestaurantList;

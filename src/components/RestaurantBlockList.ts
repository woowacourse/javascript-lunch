import Restaurant from '../domain/Restaurant';
import RestaurantBlock from './RestaurantBlock';

const RestaurantBlockList = (restaurants: Restaurant[]) =>
  `<ul class="restaurant-list">${restaurants
    .map((restaurant) => RestaurantBlock(restaurant))
    .join('')}
    </ul>`;

export default RestaurantBlockList;
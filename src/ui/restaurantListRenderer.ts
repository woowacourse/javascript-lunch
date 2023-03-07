import { RestaurantType } from '../type';
import { $ } from '../utils/selector';
import '../assets/category-asian.png';
import '../assets/category-chinese.png';
import '../assets/category-etc.png';
import '../assets/category-japanese.png';
import '../assets/category-korean.png';
import '../assets/category-western.png';
import '../assets/favorite-icon-filled.png';
import '../assets/favorite-icon-lined.png';

const restaurantListElement = $('.restaurant-list') as HTMLElement;

// export const renderRestaurantList = (restaurantList: RestaurantType[]) => {
//   restaurantListElement.innerHTML = restaurantList
//     .map((restaurant: RestaurantType) => renderRestaurant(restaurant))
//     .join('');
// };

// export const renderNewRestaurant = (restaurant: RestaurantType) => {
//   restaurantListElement.insertAdjacentHTML(
//     'beforeend',
//     renderRestaurant(restaurant)
//   );
// };

import generateRestaurantItem from '../components/template/generateRestaurantItem';
import { $ } from '../utils/dom';

const restaurantList = ({ targetId, restaurants }) => {
  const restaurantListHTML = restaurants.reduce((acc, restaurantData) => {
    return acc + generateRestaurantItem(restaurantData);
  }, '');

  $(targetId).innerHTML = restaurantListHTML;
};

export default restaurantList;

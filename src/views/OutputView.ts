import RestaurantComponent from '../components/Restaurant/RestaurantComponent';
import { Restaurant } from '../interface/RestaurantInterfaces';
import { $ } from '../utils/querySelector';

const OutputView = {
  showRestaurantList(restaurantList: Restaurant[]) {
    const restaurantListContainer = $('.restaurant-list-container');
    if (!restaurantListContainer) return;
    const restaurantListElement = document.createElement('ul');
    restaurantListElement.classList.add('.restaurant-list');
    restaurantList.forEach((restaurant: Restaurant) => {
      restaurantListElement.insertAdjacentHTML('beforeend', RestaurantComponent(restaurant));
    });
    restaurantListContainer.append(restaurantListElement);
  },
};

export default OutputView;

import RestaurantItem from '../components/restaurant/RestaurantItem';
import RestaurantList from '../components/restaurant/RestaurantList';
import RestaurantListContainer from '../components/restaurant/RestaurantListContainer';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';

const RestaurantListView = {
  render(restaurants: Restaurant[]) {
    const main = $('main');
    const container = RestaurantListContainer({ restaurants });

    main?.appendChild(container);
  },

  updateList(restaurants: Restaurant[]) {
    const restaurantListDOM = $('.restaurant-list');
    const newRestaurantList = RestaurantList({ restaurants });
    restaurantListDOM?.replaceWith(newRestaurantList);
  },

  addItem(restaurant: Restaurant) {
    const list = $('.restaurant-list');
    if (list) {
      const item = RestaurantItem({ restaurant });
      list.appendChild(item);
    }
  },

  removeItem(restaurantName: string) {
    const target = $(`.restaurant[data-id="${restaurantName}"]`);
    target?.remove();
  },
};

export default RestaurantListView;

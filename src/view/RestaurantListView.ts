import RestaurantEmptyText from '../components/restaurant/RestaurantEmptyText';
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
    this.updateList(restaurants);
  },

  updateList(restaurants: Restaurant[]) {
    const container = $('.restaurant-list-container');

    const newRestaurantList = RestaurantList({ restaurants });
    const restaurantEmptyText = RestaurantEmptyText();
    const addListElement = restaurants.length !== 0 ? newRestaurantList : restaurantEmptyText;

    container?.replaceChildren(addListElement);
  },

  addItem(restaurant: Restaurant) {
    const list = $('.restaurant-list');
    if (list) {
      const item = RestaurantItem({ restaurant });
      list.appendChild(item);
    } else {
      this.updateList([restaurant]);
    }
  },

  removeItem(restaurantName: string) {
    const target = $(`.restaurant[data-id="${restaurantName}"]`);
    target?.remove();

    const list = $('.restaurant-list');
    if (list?.children.length === 0) {
      list.replaceWith(RestaurantEmptyText());
    }
  },
};

export default RestaurantListView;

import LunchAppView from '../view/LunchAppView';
import Restaurants from '../domain/Restaurants';
import { $ } from '../util/querySelector';
import { Restaurant } from '../type';

class LunchApp {
  #restaurants = new Restaurants();
  #lunchAppView = new LunchAppView({
    parentElement: $('#root'),
    restaurants: this.#restaurants.getRestaurants(),
    parentEvent: {
      onModalCancelButtonClicked: () => this.#onModalCancelButtonClicked(),
      onModalAddButtonClicked: (restaurantData: Restaurant) =>
        this.#onModalAddButtonClicked(restaurantData),
      onHeaderAddButtonClicked: () => this.#onHeaderAddButtonClicked(),
      onFilterByChange: (filterBy: string) => this.#onFilterByChange(filterBy),
      onSortByChange: (sortBy: string) => this.#onSortByChange(sortBy),
    },
  });
}

export default LunchApp;

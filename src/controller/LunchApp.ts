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

  #onModalCancelButtonClicked() {
    this.#lunchAppView.toggleRestaurantAddModal();

    this.#lunchAppView.clearAllModalInputs();
  }

  #onModalAddButtonClicked(restaurantData: Restaurant) {
    this.#restaurants.addRestaurant(restaurantData);
    this.#restaurants.saveRestaurantsToLocalStorage();

    this.#lunchAppView.clearAllModalInputs();
    this.#lunchAppView.toggleRestaurantAddModal();
  }

  #onHeaderAddButtonClicked() {
    this.#lunchAppView.toggleRestaurantAddModal();
  }

  #onFilterByChange(filterBy: string) {
    this.#restaurants.setFilterBy(filterBy);
    console.log(this.#restaurants.getRestaurants());

    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
  }

  #onSortByChange(sortBy: string) {
    this.#restaurants.setSortBy(sortBy);
    console.log(this.#restaurants.getRestaurants());

    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
  }
}

export default LunchApp;

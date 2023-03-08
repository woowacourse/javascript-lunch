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
      onRestaurantItemClicked: (index) => this.#onRestaurantItemClicked(index),
    },
  });

  #onModalCancelButtonClicked() {
    this.#lunchAppView.closeOrOpenRestaurantAddModal('close');

    this.#lunchAppView.clearAllModalInputs();
  }

  #onModalAddButtonClicked(restaurantData: Restaurant) {
    this.#restaurants.addRestaurant(restaurantData);
    this.#restaurants.saveRestaurantsToLocalStorage();
    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());

    this.#lunchAppView.clearAllModalInputs();
    this.#lunchAppView.closeOrOpenRestaurantAddModal('open');
  }

  #onHeaderAddButtonClicked() {
    this.#lunchAppView.closeOrOpenRestaurantAddModal('open');
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

  #onRestaurantItemClicked(index: number) {
    const restaurant = this.#restaurants.getRestaurantByIndex(index);

    this.#lunchAppView.openInfoModal(restaurant);
  }
}

export default LunchApp;

import LunchAppView from '../view/LunchAppView';
import Restaurants from '../domain/Restaurants';
import { $ } from '../util/querySelector';
import { UserRestaurantInput } from '../type';

class LunchApp {
  #restaurants = new Restaurants();
  #lunchAppView = new LunchAppView({
    parentElement: $('#root'),
    restaurants: this.#restaurants.getRestaurants(),
    parentEvent: {
      onModalCancelButtonClicked: () => this.#onModalCancelButtonClicked(),
      onModalAddButtonClicked: (restaurantData: UserRestaurantInput) =>
        this.#onModalAddButtonClicked(restaurantData),
      onHeaderAddButtonClicked: () => this.#onHeaderAddButtonClicked(),
      onFilterByChange: (filterBy: string) => this.#onFilterByChange(filterBy),
      onSortByChange: (sortBy: string) => this.#onSortByChange(sortBy),
      onRestaurantItemClicked: (index) => this.#onRestaurantItemClicked(index),
      onFavoriteButtonClicked: (index: number) =>
        this.#onFavoriteButtonClicked(index),
    },
  });

  #onModalCancelButtonClicked() {
    this.#lunchAppView.closeOrOpenRestaurantAddModal('close');

    this.#lunchAppView.clearAllModalInputs();
  }

  #onModalAddButtonClicked(restaurantData: UserRestaurantInput) {
    this.#restaurants.addRestaurant(restaurantData);
    this.#restaurants.saveRestaurantsToLocalStorage();
    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());

    this.#lunchAppView.clearAllModalInputs();
    this.#lunchAppView.closeOrOpenRestaurantAddModal('close');
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

  #onRestaurantItemClicked(itemId: number) {
    const restaurant = this.#restaurants.getRestaurantById(itemId);

    this.#lunchAppView.updateRestaurantInfo(restaurant);
    this.#lunchAppView.closeOrOpenRestaurantInfoModal('open');
  }

  #onFavoriteButtonClicked(itemId: number) {
    this.#restaurants.toggleFavorite(itemId);

    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
    this.#lunchAppView.updateRestaurantInfo(
      this.#restaurants.getRestaurantById(itemId)
    );
    this.#restaurants.saveRestaurantsToLocalStorage();
  }
}

export default LunchApp;

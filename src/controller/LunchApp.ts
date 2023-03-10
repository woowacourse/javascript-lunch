import LunchAppView from '../view/LunchAppView';
import Restaurants from '../domain/Restaurants';
import Validator from '../domain/Validator';
import { $ } from '../util/querySelector';
import { UserRestaurantInput } from '../type';

class LunchApp {
  #restaurants = new Restaurants();
  #validator = new Validator();
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
      onRestaurantItemClicked: (itemId) =>
        this.#onRestaurantItemClicked(itemId),
      onFavoriteButtonClicked: (itemId: number) =>
        this.#onFavoriteButtonClicked(itemId),
      onDeleteButtonClicked: (itemId: number) =>
        this.#onDeleteButtonClicked(itemId),
      onFavoriteByChange: (favoriteMode: string) =>
        this.#onFavoriteByChange(favoriteMode),
    },
  });

  #onModalCancelButtonClicked() {
    this.#lunchAppView.closeOrOpenRestaurantAddModal('close');

    this.#lunchAppView.clearAllModalInputs();
    this.#lunchAppView.hideRestaurantAddModalErrorMessage();
  }

  #onModalAddButtonClicked(restaurantData: UserRestaurantInput) {
    try {
      this.#validator.errorIfInvalidRestaurant(restaurantData);

      this.#restaurants.addRestaurant(restaurantData);
      this.#restaurants.saveRestaurantsToLocalStorage();
      this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());

      this.#lunchAppView.clearAllModalInputs();
      this.#lunchAppView.closeOrOpenRestaurantAddModal('close');
      this.#lunchAppView.hideRestaurantAddModalErrorMessage();
    } catch ({ message }) {
      if (typeof message === 'string') {
        this.#lunchAppView.showRestaurantAddModalErrorMessage(message);
      }
    }
  }

  #onHeaderAddButtonClicked() {
    this.#lunchAppView.closeOrOpenRestaurantAddModal('open');
  }

  #onFilterByChange(filterBy: string) {
    this.#restaurants.setFilterBy(filterBy);

    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
  }

  #onSortByChange(sortBy: string) {
    this.#restaurants.setSortBy(sortBy);

    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
  }

  #onFavoriteByChange(favoriteBy: string) {
    this.#restaurants.setFavoriteBy(favoriteBy);

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

  #onDeleteButtonClicked(itemId: number) {
    this.#lunchAppView.closeOrOpenRestaurantInfoModal('close');

    this.#restaurants.deleteRestaurantById(itemId);
    this.#lunchAppView.updateRestaurants(this.#restaurants.getRestaurants());
    this.#restaurants.saveRestaurantsToLocalStorage();
  }
}

export default LunchApp;

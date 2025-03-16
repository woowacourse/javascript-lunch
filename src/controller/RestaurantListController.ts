import FavoriteButton from '../components/button/FavoriteButton';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import RestaurantListView from '../view/RestaurantListView';

class RestaurantListController {
  #restaurants;

  #onToggleFavorite;
  #onSelectRestaurant;

  constructor(
    restaurants: Restaurant[],
    onToggleFavorite: (restaurantName: string) => void,
    onSelectRestaurant: (restaurant: Restaurant) => void,
  ) {
    this.#restaurants = restaurants;
    this.#onToggleFavorite = onToggleFavorite;
    this.#onSelectRestaurant = onSelectRestaurant;
  }

  render() {
    RestaurantListView.render(this.#restaurants);

    this.#bindEvents();
  }

  updateList(restaurants: Restaurant[]) {
    RestaurantListView.updateList(restaurants);
  }

  addItem(restaurant: Restaurant) {
    RestaurantListView.addItem(restaurant);
  }

  removeItem(restaurantName: string) {
    RestaurantListView.removeItem(restaurantName);
  }

  #bindEvents() {
    const container = $('.restaurant-list-container');

    container?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const restaurantElement = target.closest('.restaurant');
      const restaurantFavoriteButton = target.closest('.restaurant__favorite-button');

      if (!restaurantElement) return;

      const restaurantName = (restaurantElement as HTMLElement).dataset.id;
      const selectedRestaurant = this.#restaurants.find((restaurant) => restaurant.name === restaurantName);

      if (selectedRestaurant) {
        if (restaurantFavoriteButton) {
          this.#onToggleFavorite(selectedRestaurant.name);
          restaurantFavoriteButton.replaceWith(FavoriteButton({ isFavorite: selectedRestaurant.isFavorite }));
        } else {
          this.#onSelectRestaurant(selectedRestaurant);
        }
      }
    });
  }
}

export default RestaurantListController;

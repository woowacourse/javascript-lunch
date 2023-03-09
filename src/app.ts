/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Modal from './components/common/Modal';
import NewRestaurantModal, {
  NewRestaurantSubmitEvent,
} from './components/restaurant/NewRestaurantModal';
import RestaurantFilterPanel, {
  RestaurantFilterChangeEvent,
} from './components/restaurant/RestaurantFilterPanel';
import RestaurantList from './components/restaurant/RestaurantList';
import Restaurant from './domain/Restaurant';
import type { RestaurantFilter } from './domain/RestaurantFilter';
import { DEFAULT_RESTAURANTS } from './fixtures';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filters: RestaurantFilter[] = [];

  $restaurantList = document.querySelector<RestaurantList>('#restaurant-list')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  $modal = document.querySelector<Modal>('r-modal')!;

  init() {
    this.load();
    this.initEventHandlers();
  }

  updateRestaurants() {
    this.$restaurantList.setRestaurants(
      this.#filters.reduce(
        (filteredRestaurants, filter) => filter(filteredRestaurants),
        this.#restaurants,
      ),
    );

    this.save();
  }

  save() {
    localStorage.setItem('restaurants', JSON.stringify(this.#restaurants));
  }

  load() {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') ?? 'null');
    if (restaurants) {
      this.#restaurants = restaurants.map((restaurant: Restaurant) =>
        Object.setPrototypeOf(restaurant, Restaurant.prototype),
      );
    }

    this.updateRestaurants();
  }

  initEventHandlers() {
    document
      .querySelector<RestaurantFilterPanel>('r-restaurant-filter-panel')
      ?.addEventListener('change', (e) => {
        const event = e as RestaurantFilterChangeEvent;

        this.#filters = event.detail;
        this.updateRestaurants();
      });

    this.$modalOpenButton.addEventListener('click', () => {
      document.querySelector<NewRestaurantModal>('r-new-restaurant-modal')?.open();
    });

    document
      .querySelector<NewRestaurantModal>('r-new-restaurant-modal')
      ?.addEventListener('restaurantcreate', (e) => {
        const event = e as NewRestaurantSubmitEvent;
        const restaurant = event.detail;

        this.#restaurants.push(restaurant);
        this.updateRestaurants();
      });
  }
}

export default App;

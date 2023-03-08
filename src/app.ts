/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Modal from './components/common/Modal';
import Select from './components/common/Select';
import NewRestaurantModal, {
  NewRestaurantSubmitEvent,
} from './components/restaurant/NewRestaurantModal';
import RestaurantList from './components/restaurant/RestaurantList';
import Restaurant from './domain/Restaurant';
import type { RestaurantFilter } from './domain/RestaurantFilter';
import { filterBy, sortByDistance, sortByName } from './domain/RestaurantFilter';
import { DEFAULT_RESTAURANTS } from './fixtures';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filters: Partial<Record<'filter' | 'sort', RestaurantFilter | null>> = {};

  $restaurantList = document.querySelector<RestaurantList>('#restaurant-list')!;

  $restaurantFilterSelect = document.querySelector<Select<RestaurantFilter | null>>(
    '#restaurant-filter-select',
  )!;

  $restaurantSortSelect =
    document.querySelector<Select<RestaurantFilter | null>>('#restaurant-sort-select')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  $modalForm = document.querySelector<HTMLFormElement>('#modal-form')!;

  $modal = document.querySelector<Modal>('r-modal')!;

  updateRestaurants() {
    this.$restaurantList.setRestaurants(
      Object.values(this.#filters)
        .filter((filter): filter is RestaurantFilter => !!filter)
        .reduce((filteredRestaurants, filter) => filter(filteredRestaurants), this.#restaurants),
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

  init() {
    this.load();

    this.initSelect();
    this.initEventHandlers();
  }

  initSelect() {
    this.$restaurantFilterSelect.setOptions([
      { value: null, label: '전체' },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: filterBy((restaurant) => restaurant.getCategory() === category),
        label: category,
      })),
    ]);

    this.$restaurantSortSelect.setOptions([
      { value: sortByName, label: '이름순' },
      { value: sortByDistance, label: '거리순' },
    ]);
  }

  initEventHandlers() {
    this.$restaurantFilterSelect.addEventListener('change', (event) => {
      if (event?.target !== this.$restaurantFilterSelect) return;
      this.#filters.filter = this.$restaurantFilterSelect.getSelectedOption()?.value;

      this.updateRestaurants();
    });

    this.$restaurantSortSelect.addEventListener('change', (event) => {
      if (event?.target !== this.$restaurantSortSelect) return;
      this.#filters.sort = this.$restaurantSortSelect.getSelectedOption()?.value;

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

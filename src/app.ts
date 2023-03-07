/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Modal from './components/common/Modal';
import Select from './components/common/Select';
import RestaurantList from './components/restaurant/RestaurantList';
import Restaurant from './domain/Restaurant';
import { filterBy, RestaurantFilter, sortByDistance, sortByName } from './domain/RestaurantFilter';
import { DEFAULT_RESTAURANTS } from './fixtures';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filters: Partial<Record<'filter' | 'sort', RestaurantFilter | null>> = {};

  $restaurantList = document.querySelector<RestaurantList>('#restaurant-list')!;

  $restaurantFilterSelect = document.querySelector<Select>('#restaurant-filter-select')!;

  $restaurantSortSelect = document.querySelector<Select>('#restaurant-sort-select')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  $modalForm = document.querySelector<HTMLFormElement>('#modal-form')!;

  $modal = document.querySelector<Modal>('r-modal')!;

  $restaurantModalCategory = document.querySelector<Select>('#restaurant-modal-category')!;

  $restaurantModalDistance = document.querySelector<Select>('#restaurant-modal-distance')!;

  updateRestaurants() {
    this.$restaurantList.setRestaurants(
      Object.values(this.#filters).reduce(
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

  init() {
    this.load();

    this.initSelect();
    this.initModalSelect();
    this.initEventHandlers();
  }

  initSelect() {
    this.$restaurantFilterSelect.setOptions([
      { value: null, label: '전체' },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]);

    this.$restaurantSortSelect.setOptions([
      { value: 'name', label: '이름순' },
      { value: 'distance', label: '거리순' },
    ]);
  }

  initModalSelect() {
    this.$restaurantModalCategory.setOptions([
      { value: '', label: '선택해주세요' },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]);

    this.$restaurantModalDistance.setOptions([
      { value: '', label: '선택해주세요' },
      ...Restaurant.DISTANCES.map((distance) => ({
        value: distance,
        label: `${distance}분 내`,
      })),
    ]);
  }

  initEventHandlers() {
    this.$restaurantFilterSelect.addEventListener('change', (event) => {
      const $rSelect = event?.target as Select;
      const value = $rSelect.getSelectedOption()?.value;

      if (value === null) {
        this.#filters.filter = null;
      } else {
        this.#filters.filter = filterBy((restaurant) => restaurant.getCategory(), String(value));
      }
      this.updateRestaurants();
    });

    this.$restaurantSortSelect.addEventListener('change', (event) => {
      const $rSelect = event?.target as Select;

      const sortFn = $rSelect.getSelectedOption()?.value === 'name' ? sortByName : sortByDistance;
      this.#filters.sort = sortFn;

      this.updateRestaurants();
    });

    this.$modalOpenButton.addEventListener('click', () => {
      this.$modal.open();
    });

    this.$modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const restaurantProps = Object.fromEntries([
        ...new FormData(event.target as HTMLFormElement).entries(),
      ]);

      try {
        const restaurant = new Restaurant({
          category: String(restaurantProps.category),
          name: String(restaurantProps.name),
          distance: Number(restaurantProps.distance),
          description: String(restaurantProps.description),
          referenceUrl: String(restaurantProps.referenceUrl),
        });

        this.#restaurants.push(restaurant);
      } catch (e) {
        const error = e as Error;
        alert(error.message);
        return;
      }

      this.$modal.close();
      this.updateRestaurants();
    });
  }
}

export default App;

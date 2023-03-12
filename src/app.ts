/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Restaurant from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import { CustomModalElement, CustomRestaurantListElement, CustomSelectElement } from './components';
import { DEFAULT_RESTAURANTS } from './fixtures';

class App {
  #restaurants: Restaurant[] = DEFAULT_RESTAURANTS;

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> = {
    sort: (_restaurants: Restaurant[]) => Restaurants.getSorted(_restaurants, Restaurants.byName),
  };

  $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list')!;

  $restaurantFilterSelect = document.querySelector<CustomSelectElement>(
    '#restaurant-filter-select',
  )!;

  $restaurantSortSelect = document.querySelector<CustomSelectElement>('#restaurant-sort-select')!;

  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  $modalForm = document.querySelector<HTMLFormElement>('#modal-form')!;

  $modal = document.querySelector<CustomModalElement>('r-modal')!;

  $restaurantModalCategory = document.querySelector<CustomSelectElement>(
    '#restaurant-modal-category',
  )!;

  $restaurantModalDistance = document.querySelector<CustomSelectElement>(
    '#restaurant-modal-distance',
  )!;

  updateRestaurants() {
    this.$restaurantList.setRestaurants(
      Object.values(this.#filterPipes).reduce(
        // value = []
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
      { value: '전체', label: '전체' },
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
      ...Restaurant.DISTANCE_BY_MINUTES.map((distance) => ({
        value: distance,
        label: `${distance}분 내`,
      })),
    ]);
  }

  initEventHandlers() {
    this.$restaurantFilterSelect.addEventListener('change', (event) => {
      const $rSelect = event?.target as CustomSelectElement;
      const value = $rSelect.getSelectedOption()?.value;

      if (value === '전체') {
        this.#filterPipes.filter = (_restaurants: Restaurant[]) =>
          Restaurants.getSorted(_restaurants, Restaurants.byName);
      } else {
        this.#filterPipes.filter = (_restaurants: Restaurant[]) =>
          Restaurants.filterByCategory(_restaurants, String(value));
      }

      this.updateRestaurants();
    });

    this.$restaurantSortSelect.addEventListener('change', (event) => {
      const $rSelect = event?.target as CustomSelectElement;

      const sortFilter = (_restaurants: Restaurant[]) =>
        Restaurants.getSorted(
          _restaurants,
          $rSelect.getSelectedOption()?.value === 'name'
            ? Restaurants.byName
            : Restaurants.byDistance,
        );

      this.#filterPipes.sort = sortFilter;

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
          distanceByMinutes: Number(restaurantProps.distanceByMinutes),
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
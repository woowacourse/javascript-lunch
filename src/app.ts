import RModal from './components/RModal';
import RRestaurantList from './components/RRestaurantList';
import RSelect from './components/RSelect';
import Restaurant from './domain/Restaurant';
import Restaurants from './domain/Restaurants';
import { DEFAULT_RESTAURANTS } from './fixtures';

class App {
  #restaurants: Restaurant[] = [];

  #filterPipes: Partial<Record<'filter' | 'sort', (restaurants: Restaurant[]) => Restaurant[]>> =
    {};

  updateRestaurants() {
    document
      .querySelector<RRestaurantList>('#restaurant-list')
      ?.setRestaurants(
        Object.values(this.#filterPipes).reduce(
          (filteredRestaurants, filter) => filter(filteredRestaurants),
          this.#restaurants,
        ),
      );
  }

  init() {
    document.querySelector<RSelect>('#restaurant-filter-select')?.setOptions([
      { value: '전체', label: '전체' },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]);

    document.querySelector<RSelect>('#restaurant-sort-select')?.setOptions([
      { value: 'name', label: '이름순' },
      { value: 'distance', label: '거리순' },
    ]);

    const restaurants = localStorage.getItem('restaurants');
    if (!restaurants) {
      document
        .querySelector<RRestaurantList>('#restaurant-list')
        ?.setRestaurants(Restaurants.getSorted(DEFAULT_RESTAURANTS, Restaurants.byName));

      this.#restaurants = DEFAULT_RESTAURANTS;
      this.updateRestaurants();
    }

    document
      .querySelector<HTMLButtonElement>('#modal-open-button')
      ?.addEventListener('click', () => {
        document.querySelector<RModal>('r-modal')?.open();
      });

    document
      .querySelector<RSelect>('#restaurant-filter-select')
      ?.addEventListener('change', (event) => {
        const $rSelect = event?.target as RSelect;
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

    document
      .querySelector<RSelect>('#restaurant-sort-select')
      ?.addEventListener('change', (event) => {
        const $rSelect = event?.target as RSelect;

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

    document.querySelector<RSelect>('#restaurant-modal-category')?.setOptions([
      { value: '', label: '선택해주세요' },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]);

    document.querySelector<RSelect>('#restaurant-modal-distance')?.setOptions([
      { value: '', label: '선택해주세요' },
      ...Restaurant.DISTANCE_BY_MINUTES.map((distance) => ({
        value: distance,
        label: `${distance}분 내`,
      })),
    ]);
  }
}

export default App;
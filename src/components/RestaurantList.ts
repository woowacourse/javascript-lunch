import Component from '../core/Component.ts';
import { FILTERS, LOCAL_STORAGE_KEY_MAP, SORTS } from '../lib/constants.ts';
import type { FilterType, RestaurantType, SortType, TabType } from '../lib/types.ts';
import { Select } from './common/index.ts';
import { RestaurantItem, RestaurantAddModal, RestaurantDetailModal, RestaurantTab } from './index.ts';
import { DEFAULT_RESTAURANT_LIST } from '../lib/constants.ts';
import { html } from '../lib/utils.ts';

interface RestaurantListState {
  restaurants: RestaurantType[];
  tab: TabType;
  filter: FilterType;
  sort: SortType;
  currentRestaurant: RestaurantType | null;
}

export default class RestaurantList extends Component<RestaurantListState> {
  constructor() {
    super();

    const localStorageRestaurants = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.restaurants);
    const initialRestaurants = localStorageRestaurants ? JSON.parse(localStorageRestaurants) : DEFAULT_RESTAURANT_LIST;

    this.state = {
      restaurants: initialRestaurants,
      tab: 'all',
      filter: '전체',
      sort: '이름순',
      currentRestaurant: null,
    };
  }

  template() {
    return html`
      <section class="restaurant-tab"></section>
      <section class="restaurant-filter-sort"></section>
      <section class="restaurant-list-container">
        <ul class="restaurant-list"></ul>
      </section>
      <section class="restaurant-add-modal"></section>
      <section class="restaurant-detail-modal"></section>
    `;
  }

  /**
   * 자식 컴포넌트 렌더링
   */

  onRender() {
    this.#appendRestaurantTab();
    this.#appendRestaurantFilterSelectSort();
    this.#appendRestaurantList();
    this.#appendRestaurantAddModal();
    this.#appendRestaurantDetailModal();
  }

  #appendRestaurantTab() {
    this.appendChild(
      new RestaurantTab({
        setTab: (tab) =>
          this.setState({
            tab,
          }),
        focusedTab: this.state.tab,
      }).render(),
      '.restaurant-tab',
    );
  }

  #appendRestaurantFilterSelectSort() {
    this.appendChild(
      new Select({
        options: FILTERS,
        setValue: (filter) =>
          this.setState({
            filter: filter as FilterType,
          }),
        selected: this.state.filter,
      }).render(),
      '.restaurant-filter-sort',
    );
    this.appendChild(
      new Select({
        options: SORTS,
        setValue: (sort) =>
          this.setState({
            sort: sort as SortType,
          }),
        selected: this.state.sort,
      }).render(),
      '.restaurant-filter-sort',
    );
  }

  #appendRestaurantList() {
    const filteredRestaurants = [...this.state.restaurants]
      .filter((restaurant) => this.state.tab === 'all' || restaurant.isLike)
      .filter((restaurant) => this.state.filter === '전체' || restaurant.category === this.state.filter)
      .sort((a, b) =>
        this.state.sort === '이름순' ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : a.distance - b.distance,
      );

    filteredRestaurants.forEach((restaurant) => {
      this.appendChild(new RestaurantItem(restaurant).render(), '.restaurant-list');
    });
  }

  #appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.#addRestaurant.bind(this),
    });
    this.appendChild(restaurantAddModal.render(), '.restaurant-add-modal');
  }

  #appendRestaurantDetailModal() {
    const restaurantDetailModal = new RestaurantDetailModal(this.state.currentRestaurant);
    this.appendChild(restaurantDetailModal.render(), '.restaurant-detail-modal');
  }

  #addRestaurant(restaurant: RestaurantType) {
    this.setState({
      restaurants: [...this.state.restaurants, restaurant],
    });

    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(this.state.restaurants));
  }

  /**
   * 이벤트 리스너
   */

  attachEventListener() {
    this.element.addEventListener('click', (event) => {
      if (!event.target) return;

      const target = event.target as HTMLElement;

      if (target.closest('#like__button') && target.dataset.id) {
        this.#toggleLike(target.dataset.id);
        return;
      }

      if (target.closest('.restaurant')) {
        this.setState({
          currentRestaurant: this.state.restaurants.find(
            (restaurant) => restaurant.id === (target.closest('.restaurant') as HTMLElement).dataset.id,
          ),
        });
        this.element.querySelector('#restaurant-detail-modal')?.classList.add('modal--open');
        return;
      }

      if (target.closest('#delete-restaurant')) {
        this.#deleteRestaurant(this.state.currentRestaurant?.id ?? '');
        return;
      }
    });
  }

  #deleteRestaurant(id: string) {
    this.setState({
      restaurants: this.state.restaurants.filter((restaurant) => restaurant.id !== id),
    });
    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(this.state.restaurants));
  }

  #toggleLike(restaurantName: string) {
    const copiedRestaurants = [...this.state.restaurants];

    const currentRestaurantIndex = this.state.restaurants.findIndex((restaurant) => restaurant.id === restaurantName);
    const targetRestaurant = this.state.restaurants[currentRestaurantIndex];

    copiedRestaurants.splice(currentRestaurantIndex, 1, { ...targetRestaurant, isLike: !targetRestaurant.isLike });

    this.setState({
      restaurants: copiedRestaurants,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(this.state.restaurants));
  }
}

import { filter, forEach, pipe, sort, toArray } from '@fxts/core';
import Component from '../core/Component.ts';
import { DEFAULT_RESTAURANT_LIST, FILTERS, SORTS } from '../lib/constants.ts';
import LocalStorage from '../lib/LocalStorage.ts';
import type { FilterType, RestaurantType, SortType, TabType } from '../lib/types.ts';
import { html } from '../lib/utils.ts';
import { Select } from './common/index.ts';
import { RestaurantAddModal, RestaurantDetailModal, RestaurantItem, RestaurantTab } from './index.ts';
import EventHandler from '../lib/EventHandler.ts';

interface RestaurantListState {
  restaurants: RestaurantType[];
  tab: TabType;
  filter: FilterType;
  sort: SortType;
  currentRestaurant: RestaurantType | null;
}

export default class RestaurantList extends Component<RestaurantListState> {
  override setup() {
    const localStorageRestaurants = LocalStorage.get('restaurants');
    const initialRestaurants = localStorageRestaurants ? JSON.parse(localStorageRestaurants) : DEFAULT_RESTAURANT_LIST;

    this.state = {
      restaurants: initialRestaurants,
      tab: 'all',
      filter: '전체',
      sort: '이름순',
      currentRestaurant: null,
    };
  }

  override template() {
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

  override onRender() {
    this._appendRestaurantTab();
    this._appendRestaurantFilterSelectSort();
    this._appendRestaurants();
    this._appendRestaurantAddModal();
    this._appendRestaurantDetailModal();
  }

  private _appendRestaurantTab() {
    this.appendChild(
      new RestaurantTab({
        setTab: (tab) =>
          this.setState({
            tab,
          }),
        focusedTab: this.state.tab,
      }).element,
      '.restaurant-tab',
    );
  }

  private _appendRestaurantFilterSelectSort() {
    this.appendChild(
      new Select({
        options: FILTERS,
        setValue: (filter) =>
          this.setState({
            filter: filter as FilterType,
          }),
        selected: this.state.filter,
        dataAction: 'filter',
      }).element,
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
        dataAction: 'sort',
      }).element,
      '.restaurant-filter-sort',
    );
  }

  private _appendRestaurants() {
    const filteredRestaurants = this._getFilteredRestaurants();

    forEach((restaurant) => {
      this.appendChild(new RestaurantItem(restaurant).element, '.restaurant-list');
    }, filteredRestaurants);
  }

  private _getFilteredRestaurants() {
    return pipe(
      this.state.restaurants,
      filter((restaurant) => this.state.tab === 'all' || restaurant.isLike),
      filter((restaurant) => this.state.filter === '전체' || restaurant.category === this.state.filter),
      sort((a, b) =>
        this.state.sort === '이름순' ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : a.distance - b.distance,
      ),
    );
  }

  private _appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this._addRestaurant.bind(this),
    });
    this.appendChild(restaurantAddModal.element, '.restaurant-add-modal');
  }

  private _appendRestaurantDetailModal() {
    const restaurantDetailModal = new RestaurantDetailModal(this.state.currentRestaurant);
    this.appendChild(restaurantDetailModal.element, '.restaurant-detail-modal');
  }

  private _addRestaurant(restaurant: RestaurantType) {
    this.setState({
      restaurants: [...this.state.restaurants, restaurant],
    });

    LocalStorage.set('restaurants', JSON.stringify(this.state.restaurants));
  }

  /**
   * 이벤트 리스너
   */

  override attachEventListener() {
    EventHandler.attachEventHandler(
      'click',
      (_, target) => this._toggleLike(target.dataset.id ?? ''),
      'like-restaurant',
    );

    EventHandler.attachEventHandler(
      'click',
      () => this._deleteRestaurant(this.state.currentRestaurant?.id ?? ''),
      'delete-restaurant',
    );

    EventHandler.attachEventHandler(
      'click',
      (_, target) => {
        this.setState({
          currentRestaurant: this.state.restaurants.find(
            (restaurant) =>
              restaurant.id === (target.closest('[data-action="restaurant-detail"]') as HTMLElement).dataset.id,
          ),
        });
        this.element.querySelector('#restaurant-detail-modal')?.classList.add('modal--open');
      },
      'restaurant-detail',
    );
  }

  private _deleteRestaurant(id: string) {
    this.setState({
      restaurants: pipe(
        this.state.restaurants,
        filter((restaurant) => restaurant.id !== id),
        toArray,
      ),
    });
    LocalStorage.set('restaurants', JSON.stringify(this.state.restaurants));
  }

  private _toggleLike(restaurantId: string) {
    const copiedRestaurants = [...this.state.restaurants];

    const currentRestaurantIndex = this.state.restaurants.findIndex((restaurant) => restaurant.id === restaurantId);
    const targetRestaurant = this.state.restaurants[currentRestaurantIndex];

    copiedRestaurants.splice(currentRestaurantIndex, 1, { ...targetRestaurant, isLike: !targetRestaurant.isLike });

    this.setState({
      restaurants: copiedRestaurants,
    });

    LocalStorage.set('restaurants', JSON.stringify(this.state.restaurants));
  }
}

import { filter, forEach, pipe, sort, toArray, map } from '@fxts/core';
import { Component } from './core/index.ts';
import { DEFAULT_RESTAURANT_LIST, FILTERS, SORTS } from '../lib/constants.ts';
import type { FilterType, RestaurantType, SortType, TabType } from '../lib/types.ts';
import { generateId, html } from '../lib/utils.ts';
import { Modal, Select } from './common/index.ts';
import { RestaurantAddModal, RestaurantDetailModal, RestaurantItem, RestaurantTab } from './index.ts';
import { eventHandlerInstance, LocalStorage } from '../lib/modules/index.ts';

interface RestaurantListState {
  restaurants: RestaurantType[];
  tab: TabType;
  filter: FilterType;
  sort: SortType;
  restaurantDetailId: string | null;
  isRestaurantAddModal: boolean;
}

export default class RestaurantList extends Component<null, RestaurantListState> {
  override setup() {
    const localStorageRestaurants = LocalStorage.get('restaurants');
    const initialRestaurants = localStorageRestaurants ? JSON.parse(localStorageRestaurants) : DEFAULT_RESTAURANT_LIST;

    this.state = {
      restaurants: initialRestaurants,
      tab: 'all',
      filter: '전체',
      sort: '이름순',
      restaurantDetailId: null,
      isRestaurantAddModal: false,
    };
  }

  override template() {
    return html`
      <div>
        <section class="restaurant-tab"></section>
        <section class="restaurant-filter-sort"></section>
        <section class="restaurant-list-container">
          <ul class="restaurant-list"></ul>
        </section>
        <section class="restaurant-add-modal"></section>
        <section class="restaurant-detail-modal"></section>
      </div>
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
      new Select<FilterType>({
        options: FILTERS.map((filter) => ({ value: filter, label: filter })),
        setValue: (filter) =>
          this.setState({
            filter,
          }),
        selected: this.state.filter,
        dataAction: 'filter',
      }).element,
      '.restaurant-filter-sort',
    );
    this.appendChild(
      new Select<SortType>({
        options: SORTS.map((sort) => ({ value: sort, label: sort })),
        setValue: (sort) =>
          this.setState({
            sort,
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
        this.state.sort === '이름순'
          ? a.name < b.name
            ? -1
            : a.name > b.name
              ? 1
              : 0
          : Number(a.distance) - Number(b.distance),
      ),
    );
  }

  private _appendRestaurantAddModal() {
    if (!this.state.isRestaurantAddModal) return;

    const restaurantAddModal = new Modal({
      id: 'restaurant-add-modal',
      children: new RestaurantAddModal({
        addRestaurant: this._addRestaurant.bind(this),
      }).element,
      onModalClose: () => this.setState({ isRestaurantAddModal: false }),
    });

    this.appendChild(restaurantAddModal.element, '.restaurant-add-modal');
  }

  private _appendRestaurantDetailModal() {
    if (!this.state.restaurantDetailId) return;

    const restaurantDetail = this.state.restaurants.find(
      (restaurant) => restaurant.id === this.state.restaurantDetailId,
    );

    if (!restaurantDetail) return;

    const restaurantDetailModal = new Modal({
      id: 'restaurant-detail-modal',
      children: new RestaurantDetailModal({
        ...restaurantDetail,
      }).element,
      onModalClose: () => this.setState({ restaurantDetailId: null }),
    });

    this.appendChild(restaurantDetailModal.element, '.restaurant-detail-modal');
  }

  private _addRestaurant(restaurant: RestaurantType) {
    this.setState({
      restaurants: [...this.state.restaurants, restaurant],
    });

    LocalStorage.set('restaurants', JSON.stringify(this.state.restaurants));
    this.setState({ isRestaurantAddModal: false });
  }

  /**
   * 이벤트 리스너
   */

  override addEventListener() {
    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: () => this.setState({ isRestaurantAddModal: true }),
      dataAction: 'restaurant-add',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ currentTarget }) => currentTarget.dataset.id && this._toggleLike(currentTarget.dataset.id),
      dataAction: 'restaurant-like',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ currentTarget }) => currentTarget.dataset.id && this._deleteRestaurant(currentTarget.dataset.id),
      dataAction: 'restaurant-delete',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ currentTarget }) => {
        this.setState({
          restaurantDetailId: currentTarget.dataset.id,
        });
      },
      dataAction: 'restaurant-detail',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'click',
      callback: ({ currentTarget }) => {
        this.setState({ tab: currentTarget.dataset.tab as TabType });
      },
      dataAction: 'tab-change',
    });

    eventHandlerInstance.addEventListener({
      eventType: 'submit',
      callback: ({ event, target }) => {
        event.preventDefault();
        const id = generateId();

        const formData = new FormData(target as HTMLFormElement);
        const modalInput = { ...Object.fromEntries(formData), id };

        this._addRestaurant(modalInput as unknown as RestaurantType);
      },
      dataAction: 'restaurant-create',
    });
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
    this.setState({
      restaurants: pipe(
        this.state.restaurants,
        map((restaurant) =>
          restaurant.id === restaurantId ? { ...restaurant, isLike: !restaurant.isLike } : restaurant,
        ),
        toArray,
      ),
    });

    LocalStorage.set('restaurants', JSON.stringify(this.state.restaurants));
  }
}

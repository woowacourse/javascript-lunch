import Component from '../core/Component.ts';
import { LOCAL_STORAGE_KEY_MAP } from '../lib/constants.ts';
import { CategoryType, RestaurantType, SortType, TabType } from '../lib/types.ts';
import { RestaurantAddModal, RestaurantDetail, RestaurantDetailModal, RestaurantTab, Restaurant } from './index.ts';

interface RestaurantListState {
  restaurants: RestaurantType[];
  tab: TabType;
  filter: CategoryType;
  sort: SortType;
  currentRestaurant: RestaurantType | null;
}

export default class RestaurantList extends Component<RestaurantListState> {
  constructor() {
    super();

    const localStorageRestaurants = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.restaurants);
    const initialRestaurants = localStorageRestaurants ? JSON.parse(localStorageRestaurants) : [];

    this.state = {
      restaurants: initialRestaurants,
      tab: 'all',
      filter: '전체',
      sort: '이름순',
      currentRestaurant: null,
    };
  }

  template() {
    return `
      <section class="restaurant-tab"></section>
      <section class="restaurant-detail"></section>
      <section class="restaurant-list-container">
        <ul class="restaurant-list">

        </ul>
      </section>
      <section class="restaurant-add-modal"></section>
      <section class="restaurant-detail-modal"></section>
    `;
  }

  /**
   * 이벤트 리스너
   */

  componentDidMount() {
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  #attachClickEventListener() {
    window.addEventListener('click', (event) => {
      if (!event.target) return;

      const target = event.target as HTMLElement;

      if (target.closest('.gnb__button')) {
        this.element.querySelector('#restaurant-add-modal')?.classList.add('modal--open');
        return;
      }
      if (target.closest('#modal-cancel') || target.closest('.modal-backdrop')) {
        this.#removeModals();
        return;
      }

      if (target.closest('#like__button') && target.dataset.name) {
        this.#toggleLike(target.dataset.name);
        return;
      }

      if (target.closest('.restaurant')) {
        this.setState({
          currentRestaurant: this.state.restaurants.find(
            (restaurant) => restaurant.name === (target.closest('.restaurant') as HTMLElement).dataset.name,
          ),
        });
        this.element.querySelector('#restaurant-detail-modal')?.classList.add('modal--open');
        return;
      }

      if (target.closest('#modal-delete')) {
        this.#deleteRestaurant(this.state.currentRestaurant?.name ?? '');
        this.#removeModals();
        return;
      }
    });
  }

  #deleteRestaurant(name: string) {
    this.setState({
      restaurants: this.state.restaurants.filter((restaurant) => restaurant.name !== name),
    });
    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(this.state.restaurants));
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.#removeModals();
    });
  }

  #toggleLike(restaurantName: string) {
    const copiedRestaurants = [...this.state.restaurants];

    const currentRestaurantIndex = this.state.restaurants.findIndex((restaurant) => restaurant.name === restaurantName);
    const targetRestaurant = this.state.restaurants[currentRestaurantIndex];

    copiedRestaurants.splice(currentRestaurantIndex, 1, { ...targetRestaurant, isLike: !targetRestaurant.isLike });

    this.setState({
      restaurants: copiedRestaurants,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(this.state.restaurants));
  }

  /**
   * 자식 컴포넌트 렌더링
   */

  onRender() {
    this.#appendRestaurantTab();
    this.#appendRestaurantDetail();
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

  #appendRestaurantDetail() {
    this.appendChild(
      new RestaurantDetail({
        filter: this.state.filter,
        sort: this.state.sort,
        setFilter: (filter) =>
          this.setState({
            filter,
          }),
        setSort: (sort) =>
          this.setState({
            sort,
          }),
      }).render(),
      '.restaurant-detail',
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
      this.appendChild(new Restaurant(restaurant).render(), '.restaurant-list');
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

  #removeModals() {
    this.element.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.remove('modal--open');
    });
  }
}

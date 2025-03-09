import {
  Header,
  RestaurantAddModal,
  RestaurantDetail,
  RestaurantDetailModal,
  RestaurantList,
  RestaurantTab,
} from './components/index.ts';
import Component from './core/Component.ts';
import { FilterType, RestaurantType, SortType, TabType } from './lib/types.ts';
import { html } from './lib/utils.ts';

export default class Application extends Component<{
  restaurants: RestaurantType[];
  tab: TabType;
  filter: FilterType;
  sort: SortType;
  currentRestaurant: RestaurantType | null;
}> {
  constructor() {
    super({});

    this.setState({
      restaurants: JSON.parse(localStorage.getItem('restaurants') ?? '') ?? [],
      tab: 'all',
      filter: '전체',
      sort: '이름순',
      currentRestaurant: null,
    });
  }

  template() {
    return html`${new Header({ title: '오늘 뭐 먹지' })}`;
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
        this.setState({
          restaurants: this.state.restaurants.filter(
            (restaurant) => restaurant.name !== this.state.currentRestaurant?.name,
          ),
        });
        localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
        this.#removeModals();
        return;
      }
    });
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

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
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
    this.element.appendChild(
      new RestaurantTab({
        setTab: (tab) =>
          this.setState({
            tab,
          }),
        focusedTab: this.state.tab,
      }).render(),
    );
  }

  #appendRestaurantDetail() {
    this.element.appendChild(
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
    );
  }

  #appendRestaurantList() {
    const filteredRestaurants = [...this.state.restaurants]
      .filter((restaurant) => this.state.tab === 'all' || restaurant.isLike)
      .filter((restaurant) => this.state.filter === '전체' || restaurant.category === this.state.filter)
      .sort((a, b) =>
        this.state.sort === '이름순' ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : a.distance - b.distance,
      );

    this.element.appendChild(
      new RestaurantList({
        restaurants: filteredRestaurants,
      }).render(),
    );
  }

  #appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.#addRestaurant.bind(this),
    });
    this.element.appendChild(restaurantAddModal.render());
  }

  #appendRestaurantDetailModal() {
    this.element.appendChild(new RestaurantDetailModal({ currentRestaurant: this.state.currentRestaurant }).render());
  }

  #addRestaurant(restaurant: RestaurantType) {
    this.setState({
      restaurants: [...this.state.restaurants, restaurant],
    });

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
  }

  #removeModals() {
    this.element.querySelectorAll('.modal').forEach((modal) => {
      modal.classList.remove('modal--open');
    });
  }
}

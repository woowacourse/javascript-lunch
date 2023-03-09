import type { Category, State } from './types/restaurantTypes';
import RestaurantController from './model/RestaurantController';
import Modal from './components/Modal';
import { DEFAULT_CATEGORY, LOCAL_STORAGE_KEY, SORTING_OPTION } from './constant/constant';
import DEFAULT_RESTAURANT_DATA from './constant/defaultRestaurantData';
import { getDataFromLocalStorage } from './utils/localStorage';
import Header from './components/Header';
import RestaurantItem from './components/RestaurantItem';

export default class App {
  $target: HTMLElement;
  _state!: State;

  _restaurantController: RestaurantController;
  _header: Header;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.setup();
    this._restaurantController = new RestaurantController(this._state.restaurants);
    this._header = new Header();

    this.render();

    this._header.bindAddRestaurantButton();
    document.addEventListener('addRestaurantClicked', this.handleAddRestaurantClicked.bind(this));
    document.addEventListener('closeModal', this.onCloseModal.bind(this));
  }

  handleAddRestaurantClicked() {
    const target = document.querySelector('body') as HTMLElement;

    new Modal(target, this._restaurantController, this._state);
  }

  setup() {
    this._state = getDataFromLocalStorage(LOCAL_STORAGE_KEY) || DEFAULT_RESTAURANT_DATA;
  }

  setState(newState: Partial<State>): void {
    this._state = { ...this._state, ...newState };
    this.render();
  }

  template() {
    return `
    ${this._header.template()}
    <main>
    <!-- 카테고리/정렬 필터 -->
    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>

      <!-- 정렬 셀렉트 박스 -->
      <select name="sorting" id="sorting-filter" class="restaurant-filter" >
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>

    <!-- 음식점 목록 -->
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>        
    </section>
    </main>
    `;
  }

  render(): void {
    this.$target.innerHTML = this.template();

    const $restaurantList = this.$target.querySelector('.restaurant-list') as HTMLElement;
    $restaurantList.innerHTML = '';
    this._state.restaurants.forEach(restaurant => {
      new RestaurantItem($restaurantList, restaurant);
    });

    const categoryFilter = this.$target.querySelector('#category-filter');
    if (categoryFilter instanceof HTMLSelectElement) {
      categoryFilter.value = this._state!.filter;
    }

    const sortFilter = this.$target.querySelector('#sorting-filter');
    if (sortFilter instanceof HTMLSelectElement) {
      sortFilter.value = this._state!.sortingOption;
    }

    this.listenEvent();
  }

  listenEvent() {
    this._header.bindAddRestaurantButton();

    this.$target.querySelector('#category-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const filteredRestuarant = this._restaurantController!.filterByCategory(value as Category);

      this.setState({ filter: value, restaurants: filteredRestuarant });
    });

    this.$target.querySelector('#sorting-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;

      if (value === SORTING_OPTION.NAME) {
        const sortedByName = this._restaurantController!.sortByName(this._state!.filter as Category);
        this.setState({ sortingOption: value, restaurants: sortedByName });
        return;
      }

      if (value === SORTING_OPTION.DISTANCE) {
        const sortedByDistance = this._restaurantController!.sortByDistance(this._state!.filter as Category);
        this.setState({ sortingOption: value, restaurants: sortedByDistance });
        return;
      }
    });
  }

  onCloseModal() {
    this.setState({
      sortingOption: SORTING_OPTION.NAME,
      filter: DEFAULT_CATEGORY,
      isModalOpen: !this._state.isModalOpen,
    });
  }
}

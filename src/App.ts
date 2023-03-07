import type { Category, State } from './types/restaurantTypes';
import image from './img/images';
import Restaurants from './model/Restaurants';
import Modal from './components/Modal';
import LOCAL_STORAGE_KEY from './constant/constant';
import DEFAULT_RESTAURANT_DATA from './constant/defaultRestaurantData';
import { getDataFromLocalStorage } from './utils/localStorage';
import Header from './components/Header';

export default class App {
  $target: HTMLElement;
  $state!: State;

  restuarants: Restaurants;
  header: Header;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.setup();
    this.restuarants = new Restaurants(this.$state.restaurants);
    this.header = new Header();

    this.render();

    this.header.bindAddRestaurantButton();
    document.addEventListener('addRestaurantClicked', this.handleAddRestaurantClicked.bind(this));
    document.addEventListener('closeModal', this.onCloseModal.bind(this));
  }

  handleAddRestaurantClicked() {
    const target = document.querySelector('body') as HTMLElement;

    new Modal(target, this.restuarants, this.$state);
  }

  setup() {
    this.$state = getDataFromLocalStorage(LOCAL_STORAGE_KEY) || DEFAULT_RESTAURANT_DATA;
  }

  setState(newState: Partial<State>): void {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  template() {
    return `
    ${this.header.template()}
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
        ${this.$state!.restaurants.map(
          ({ name, category, distance, description }) => `
          <li class="restaurant">
            <div class="restaurant__category">
              <img src="${image[category]}" alt="${category}" class="category-icon">
            </div>
            <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
            </div>
          </li>
        `
        ).join('')}
      </ul>        
    </section>
    </main>
    `;
  }

  render(): void {
    this.$target.innerHTML = this.template();

    const categoryFilter = this.$target.querySelector('#category-filter');
    if (categoryFilter instanceof HTMLSelectElement) {
      categoryFilter.value = this.$state!.filter;
    }

    const sortFilter = this.$target.querySelector('#sorting-filter');
    if (sortFilter instanceof HTMLSelectElement) {
      sortFilter.value = this.$state!.sort;
    }

    this.listenEvent();
  }

  listenEvent() {
    this.header.bindAddRestaurantButton();

    this.$target.querySelector('#category-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      const filteredRestuarant = this.restuarants!.filterByCategory(value as Category);

      this.setState({ filter: value, restaurants: filteredRestuarant });
    });

    this.$target.querySelector('#sorting-filter')!.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;

      if (value === 'name') {
        const sortedByName = this.restuarants!.sortByName(this.$state!.filter as Category);
        this.setState({ sort: value, restaurants: sortedByName });
        return;
      }

      if (value === 'distance') {
        const sortedByDistance = this.restuarants!.sortByDistance(this.$state!.filter as Category);
        this.setState({ sort: value, restaurants: sortedByDistance });
        return;
      }
    });
  }

  onCloseModal() {
    this.setState({
      sort: 'name',
      filter: '전체',
      isModal: !this.$state.isModal,
    });
  }
}

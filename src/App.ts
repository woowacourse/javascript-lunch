import type { Category, State } from './types/restaurantTypes';
import RestaurantController from './model/RestaurantController';
import addRestaurantModal from './components/addRestaurantModal';
import { LOCAL_STORAGE_KEY } from './constant/constant';
import DEFAULT_RESTAURANT_DATA from './constant/defaultRestaurantData';
import { getDataFromStorage, setUpdateDataToStorage } from './utils/localStorage';
import Header from './components/Header';
import RestaurantItem from './components/RestaurantItem';
import TabMenu from './components/TabMenu';
import SelectBox from './components/SelectBox';
import detailRestaurantModal from './components/detailRestaurantModal';

export default class App {
  private readonly $target: HTMLElement;
  private _state!: State;

  private readonly _restaurantController: RestaurantController;

  private readonly _header: Header;
  private readonly _tabMenu: TabMenu;
  private readonly CategorySelectBox: SelectBox;
  private readonly SortingSelectBox: SelectBox;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this._state = getDataFromStorage(LOCAL_STORAGE_KEY) || DEFAULT_RESTAURANT_DATA;
    this._restaurantController = new RestaurantController(this._state.restaurants);

    this._header = new Header();
    this._tabMenu = new TabMenu();
    this.CategorySelectBox = new SelectBox(
      [
        { label: '전체', value: '전체' },
        { label: '한식', value: '한식' },
        { label: '중식', value: '중식' },
        { label: '일식', value: '일식' },
        { label: '양식', value: '양식' },
        { label: '아시안', value: '아시안' },
        { label: '기타', value: '기타' },
      ],
      'category'
    );
    this.SortingSelectBox = new SelectBox(
      [
        { label: 'name', value: '이름순' },
        { label: 'distance', value: '거리순' },
      ],
      'sorting'
    );

    this.init();
  }

  private init() {
    this.setup();
    this.bindEvents();
    this.render();
    this.setTabMenu();
  }

  private setup() {
    const previousRestaurantList = this._restaurantController.sortRestaurants(
      this._state.filter as Category,
      this._state.sortingOption
    );
    this._state.restaurants = previousRestaurantList;
  }

  private bindEvents() {
    document.addEventListener('addRestaurantClicked', this.handleAddRestaurantClicked.bind(this));

    document.addEventListener('allRestaurantClicked', this.handleAllRestaurantClicked.bind(this));
    document.addEventListener('likedRestaurantClicked', this.handleLikedRestaurantClicked.bind(this));

    document.addEventListener('restaurantLikeToggled', this.handleRestaurantLikeToggled.bind(this));
    document.addEventListener('restaurantItemClicked', this.handleRestaurantItemClicked.bind(this));

    document.addEventListener('closeaddModal', this.onCloseaddModal.bind(this));
    document.addEventListener('closeDetailModal', this.onCloseaddModal.bind(this));
  }

  private handleAddRestaurantClicked() {
    const target = document.querySelector('body') as HTMLElement;

    new addRestaurantModal(target, this._restaurantController, this._state);
  }

  private handleAllRestaurantClicked() {
    const allButton = this.$target.querySelector('#allRestaurantButton');
    const likedButton = this.$target.querySelector('#likedRestaurantButton');
    const categoryFilter = this.$target.querySelector('#category-filter') as HTMLSelectElement;
    const sortingFilter = this.$target.querySelector('#sorting-filter') as HTMLSelectElement;

    allButton?.classList.add('selected');
    likedButton?.classList.remove('selected');
    categoryFilter?.classList.remove('hidden');
    sortingFilter?.classList.remove('hidden');
    categoryFilter.value = this._state.filter;
    sortingFilter.value = this._state.sortingOption;

    const selectedRestaurantList = this._restaurantController.sortRestaurants(
      categoryFilter.value as Category,
      sortingFilter.value
    );

    this.setState({
      restaurants: selectedRestaurantList,
      currentTab: 'ALL',
    });
    setUpdateDataToStorage({ currentTab: 'ALL' });

    this._tabMenu.update(allButton as Element, likedButton as Element, 'all');
  }

  private handleLikedRestaurantClicked() {
    const allButton = this.$target.querySelector('#allRestaurantButton');
    const likedButton = this.$target.querySelector('#likedRestaurantButton');
    const categoryFilter = this.$target.querySelector('#category-filter');
    const sortingFilter = this.$target.querySelector('#sorting-filter');

    allButton?.classList.remove('selected');
    likedButton?.classList.add('selected');
    categoryFilter?.classList.add('hidden');
    sortingFilter?.classList.add('hidden');

    const likedRestaurant = this._restaurantController.filterByLiked();

    this.setState({
      restaurants: likedRestaurant,
      currentTab: 'LIKED',
    });
    setUpdateDataToStorage({ currentTab: 'LIKED' });

    this._tabMenu.update(allButton as Element, likedButton as Element, 'liked');
  }

  private handleRestaurantLikeToggled() {
    setUpdateDataToStorage({ restaurants: this._restaurantController.getRestaurants() });
  }

  private handleRestaurantItemClicked(event: unknown) {
    if (!(event instanceof CustomEvent)) {
      return;
    }

    const restaurantInfo = event.detail;

    new detailRestaurantModal(this._restaurantController, restaurantInfo, this._state);
  }

  private setState(newState: Partial<State>): void {
    this._state = { ...this._state, ...newState };
    this.render();
  }

  private setTabMenu() {
    if (this._state.currentTab) {
      if (this._state.currentTab === 'ALL') {
        this.handleAllRestaurantClicked();
      } else if (this._state.currentTab === 'LIKED') {
        this.handleLikedRestaurantClicked();
      }
    }
  }

  private render(): void {
    this.renderTemplate();
    this.renderRestaurantList();
    this.listenEvent();
  }

  private renderTemplate(): void {
    this.$target.innerHTML = this.template();

    const categoryFilter = this.$target.querySelector('#category-filter') as HTMLSelectElement;
    const sortFilter = this.$target.querySelector('#sorting-filter') as HTMLSelectElement;

    categoryFilter.value = this._state.filter;
    sortFilter.value = this._state.sortingOption;
  }

  private template() {
    return `
    ${this._header.template()}
    <main>
      <section class="tabMenu-container">
        ${this._tabMenu.template()}
      </section>
      <section class="restaurant-filter-container">
        ${this.CategorySelectBox.template()}
        ${this.SortingSelectBox.template()}
      </section>
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        </ul>        
      </section>
    </main>
    `;
  }

  private renderRestaurantList(): void {
    const $restaurantList = this.$target.querySelector('.restaurant-list') as HTMLElement;

    $restaurantList.innerHTML = '';
    this._state.restaurants.forEach(restaurant => {
      new RestaurantItem($restaurantList, restaurant);
    });
  }

  private listenEvent() {
    this._header.bindAddRestaurantButton();
    this._tabMenu.bindTabButton();

    const categoryFilter = this.$target.querySelector('#category-filter') as HTMLSelectElement;
    categoryFilter.addEventListener('change', this.handleCategoryFilterChange.bind(this));

    const sortFilter = this.$target.querySelector('#sorting-filter') as HTMLSelectElement;
    sortFilter.addEventListener('change', this.handleSortingFilterChange.bind(this));
  }

  private handleCategoryFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const category = target.value;
    const filteredRestuarant = this._restaurantController.filterByCategory(category as Category);
    this.setState({ filter: category, restaurants: filteredRestuarant });
    setUpdateDataToStorage({ filter: category });
  }

  private handleSortingFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const sortingOption = target.value;

    const sortedRestaurants = this._restaurantController.sortRestaurants(this._state.filter as Category, sortingOption);
    this.setState({ sortingOption: sortingOption, restaurants: sortedRestaurants });
    setUpdateDataToStorage({ sortingOption: sortingOption });
  }

  private onCloseaddModal() {
    const storedData = getDataFromStorage(LOCAL_STORAGE_KEY);
    const selectedRestaurantList = this._restaurantController.sortRestaurants(
      this._state.filter as Category,
      this._state.sortingOption
    );
    this.setState({
      sortingOption: storedData?.sortingOption,
      filter: storedData?.filter,
      isModalOpen: !this._state.isModalOpen,
      restaurants: selectedRestaurantList,
    });
    this.setTabMenu();
  }
}

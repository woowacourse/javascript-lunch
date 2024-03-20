import Matzip from './matzip';
import storage from './storage';
import LOCAL_STORAGE_KEY from './constants/LocalStorageKey';

const { MATZIP_DATA, FAVORITE_DATA } = LOCAL_STORAGE_KEY;
import { CategoryType, SortType } from './types';

import FilterContainer, { FilterChangeEvent } from './components/FilterContainer';
import TabPane from './components/TabPane';
import Header from './components/header/Header';
import Tab from './components/tab/Tab';
import Restaurant from './components/restaurant/Restaurant';
import ListContainer from './components/listContainer/ListContainer';
import { TabChangeEvent } from './components/tab/TabElement';

class App extends HTMLElement {
  static matzip: Matzip;
  private main: HTMLElement;
  private tabPane: TabPane;

  constructor() {
    super();
    App.matzip = new Matzip(storage.getData(MATZIP_DATA), storage.getData(FAVORITE_DATA));

    this.main = this.createMain();
    this.createHeader(this.main);
    this.createTab();
    this.tabPane = this.createTabpane();
    this.listenTabChange();
    this.setEventWholeMode();
  }

  listenTabChange() {
    document.addEventListener('tabChangeEvent', (event: Event) => {
      const tabChangeEvent = event as TabChangeEvent;
      const activeTabIndex = tabChangeEvent.detail.activeTabIndex;

      activeTabIndex === 0 ? this.setEventWholeMode() : this.setMyFavoriteMode();
    });
  }

  setEventWholeMode() {
    this.createWholeRestaurant();
    this.changeFilter();
  }

  setMyFavoriteMode() {
    this.createMyFavoriteList();
  }

  createHeader(main: HTMLElement) {
    const header = new Header(main);
    this.prepend(header);
  }

  createMain() {
    const main = document.createElement('main');
    this.appendChild(main);
    return main;
  }

  createTab() {
    const tab = new Tab(['모든 음식점', '자주 가는 음식점']);
    this.main.prepend(tab);
  }

  createTabpane() {
    const tabPane = new TabPane();
    this.main.appendChild(tabPane);
    return tabPane;
  }

  createWholeRestaurant() {
    const filterContainer = new FilterContainer();
    const { category, sort } = filterContainer.getFilterValues();
    const restaurantElements: Restaurant[] = App.matzip
      .filterAndSort(category as CategoryType, sort as SortType)
      .map((restaurant) => new Restaurant(restaurant, App.matzip.isFavorite(restaurant.id)));
    const listContainer = new ListContainer(restaurantElements);

    this.tabPane.showContent({ filterContainer, listContainer });
  }

  createMyFavoriteList() {
    const favoriteRestaurants: Restaurant[] = App.matzip
      .getMyFavoriteRestaurants()
      .map((restaurant) => new Restaurant(restaurant, true));
    const listContainer = new ListContainer(favoriteRestaurants);
    this.tabPane.showContent({ listContainer });
  }

  changeFilter() {
    document.addEventListener('filterChange', (event: Event) => {
      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurantElements: Restaurant[] = App.matzip
        .filterAndSort(selectedCategory as CategoryType, selectedSort as SortType)
        .map((restaurant) => new Restaurant(restaurant, App.matzip.isFavorite(restaurant.id)));

      const listContainer = new ListContainer(restaurantElements);
      this.tabPane.showListChange(listContainer);
    });
  }
}

customElements.define('matzip-app', App);

export default App;

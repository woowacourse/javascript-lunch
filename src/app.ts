import Matzip from './matzip';
import storage from './storage';
import LOCAL_STORAGE_KEY from './constants/LocalStorageKey';

const { MATZIP_DATA, FAVORITE_DATA } = LOCAL_STORAGE_KEY;
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import DOM from './utils/DOM';

import FilterContainer, { FilterChangeEvent } from './components/FilterContainer';
import TabPane from './components/TabPane';
import Header from './components/header/Header';
import Tab from './components/tab/Tab';
import Restaurant from './components/restaurant/Restaurant';
import ListContainer from './components/listContainer/ListContainer';
import RestaurantForm from './components/RestaurantForm';
import { RestaurantDeleteEvent } from './components/restaurantDetail/RestaurantDetail';
import { TabChangeEvent } from './components/tab/TabElement';

const { $ } = DOM;

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
    this.setEvent();
  }

  listenTabChange() {
    document.addEventListener('tabChangeEvent', (event: Event) => {
      const tabChangeEvent = event as TabChangeEvent;
      const activeTabIndex = tabChangeEvent.detail.activeTabIndex;

      activeTabIndex === 0 ? this.setEventWholeMode() : this.setMyFavoriteMode();
    });
  }

  setEvent() {
    this.listenRestaurantAdd();
    this.setEventWholeMode();
    this.listenRestaurantDelete();
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

  listenRestaurantAdd() {
    const form = $<RestaurantForm>('#restaurant-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formFields = form.getFormFields();
      const fieldValues = formFields.map((field) => field.getValue());

      const newRestaurant: RestaurantType = {
        id: `matzip${crypto.randomUUID().replace(/-/g, '')}`,
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1],
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      try {
        App.matzip.add(newRestaurant);
        storage.addData(MATZIP_DATA, newRestaurant);
        this.tabPane.showListAppend(new Restaurant(newRestaurant, false));
        form.reset();
      } catch (error) {
        alert(error);
      }
    });
  }

  listenRestaurantDelete() {
    document.addEventListener('deleteRestaurant', (event: Event) => {
      const restaurantDeleteEvent = event as RestaurantDeleteEvent;
      const targetId = restaurantDeleteEvent.detail.targetId;

      App.matzip.delete(targetId);
      storage.modifyData<RestaurantType>(MATZIP_DATA, App.matzip.getRestaurants());
      this.tabPane.showListDelete(targetId);
    });
  }
}

customElements.define('matzip-app', App);

export default App;

import Validator from './domain/Validator';
import Restaurants from './domain/Restaurants';

import Header from './view/components/Header';
import RestaurantList from './view/components/RestaurantList';
import Selector from './view/components/Selector';

import getFormData from './utils/getFormData';

import {
  Restaurant,
  RestaurantSortingType,
  RestaurantCategoryType,
} from './type/common';

import { $ } from './utils/querySelector';
import cache from './data/cache';

import RestaurantAddModal from './view/components/RestaurantAddModal';
import { LOCAL_STORAGE_KEY } from './constant';

type StateType = {
  restaurants?: Restaurant[];
  categorySelector?: RestaurantCategoryType;
  sortedSelector?: RestaurantSortingType;
  isModal?: boolean;
};

class App {
  #root;
  #state: StateType;
  #restaurants = new Restaurants();

  constructor($target: HTMLElement) {
    this.#root = $target;

    this.#state = {
      restaurants: [],
      categorySelector: '전체',
      sortedSelector: 'name',
      isModal: false,
    };

    this.render();
    this.loadLocalStorage();
  }

  #template() {
    return `
      <header class="gnb"></header>
      <main>
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
        <section class="restaurant-modal-container"></section>
      </main>
    `;
  }

  #mounted() {
    new Header({
      $target: $('.gnb') as HTMLElement,
      addRestaurantButtonEvent: this.addRestaurantButtonEvent.bind(this),
    });

    new Selector({
      $target: $('.restaurant-filter-container') as HTMLElement,
      info: {
        name: 'category',
        id: 'category-filter',
        options: [
          { value: '전체', name: '전체' },
          { value: '한식', name: '한식' },
          { value: '중식', name: '중식' },
          { value: '일식', name: '일식' },
          { value: '양식', name: '양식' },
          { value: '아시안', name: '아시안' },
          { value: '기타', name: '기타' },
        ],
        selected: this.#state.categorySelector as RestaurantCategoryType,
      },
      onChangeEvent: this.onSortRestaurantsEvent.bind(this),
    });

    new Selector({
      $target: $('.restaurant-filter-container') as HTMLElement,
      info: {
        name: 'sorting',
        id: 'sorting-filter',
        options: [
          { value: 'name', name: '이름순' },
          { value: 'distance', name: '거리순' },
        ],
        selected: this.#state.sortedSelector as RestaurantSortingType,
      },
      onChangeEvent: this.onSortRestaurantsEvent.bind(this),
    });

    new RestaurantList({
      $target: $('.restaurant-list-container') as HTMLElement,
      restaurants: this.#state.restaurants as Restaurant[],
    });

    new RestaurantAddModal({
      $target: $('.restaurant-modal-container') as HTMLElement,
      isModal: this.#state.isModal,
      onClickEvent: this.onAddRestaurantFormEvent.bind(this),
    });
  }

  render() {
    this.#root.innerHTML = this.#template();
    this.#mounted();
  }

  setState(newData: StateType) {
    this.#state = { ...this.#state, ...newData };
    this.render();
  }

  loadLocalStorage() {
    const data = cache.getCache(LOCAL_STORAGE_KEY);
    if (!data) return;

    data.restaurants?.forEach((restaurant: Restaurant) => {
      this.#restaurants.addRestaurant(restaurant);
    });

    this.setState(data);
  }

  saveLocalStorage() {
    cache.setCache(LOCAL_STORAGE_KEY, this.#state);
    this.loadLocalStorage();
  }

  addRestaurantButtonEvent() {
    this.setState({ isModal: true });
  }

  onSortRestaurantsEvent(value: string) {
    if (Validator.isRestaurantCategory(value)) {
      this.setState({
        restaurants: this.#restaurants.filterByCategory(value),
        categorySelector: value as RestaurantCategoryType,
        sortedSelector: this.#state.sortedSelector,
      });
    }

    if (value === 'name') {
      this.setState({
        restaurants: this.#restaurants.sortByName(),
        categorySelector: this.#state.categorySelector,
        sortedSelector: value,
      });
    }

    if (value === 'distance') {
      this.setState({
        restaurants: this.#restaurants.sortByDistance(),
        categorySelector: this.#state.categorySelector,
        sortedSelector: value,
      });
    }
  }

  onAddRestaurantFormEvent(type: string) {
    if (type === 'add') {
      const restaurant = getFormData(
        $('#modal-form') as HTMLFormElement
      ) as Restaurant;

      if (!this.validateInputData(restaurant)) return;

      this.#restaurants.addRestaurant(restaurant);

      this.setState({
        isModal: false,
        restaurants: this.#restaurants.getRestaurants(),
      });

      this.saveLocalStorage();
    }

    if (type === 'cancel') {
      this.setState({ isModal: false });
    }
  }

  validateInputData(restaurant: Restaurant) {
    const { category, distance, link, name } = restaurant;
    try {
      Validator.checkCategory(category);
      Validator.checkName(name);
      Validator.checkDistance(distance);
      Validator.checkLink(link);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
        return false;
      }
    }
  }
}

export default App;

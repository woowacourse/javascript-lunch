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
import { menu1, menu2, menu3, menu4 } from './data/dummy';

import { $ } from './utils/querySelector';
import RestaurantAddModal from './view/components/RestaurantAddModal';

/* 더미 데이터 */
const dummyData = [menu1, menu2, menu3, menu4];

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
      onChangeEvent: this.onChangeEvent.bind(this),
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
      onChangeEvent: this.onChangeEvent.bind(this),
    });

    new RestaurantList({
      $target: $('.restaurant-list-container') as HTMLElement,
      restaurants: this.#state.restaurants as Restaurant[],
    });

    new RestaurantAddModal({
      $target: $('.restaurant-modal-container') as HTMLElement,
      isModal: this.#state.isModal,
      onClickEvent: this.onClickEvent.bind(this),
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

  addRestaurantButtonEvent() {
    this.setState({ isModal: true });
  }

  onChangeEvent(value: string) {
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

  onClickEvent(type: string) {
    if (type === 'add') {
      const { category, description, distance, link, name } = getFormData(
        $('#modal-form') as HTMLFormElement
      );

      this.#restaurants.addRestaurant({
        category,
        description,
        distance,
        link,
        name,
      } as Restaurant);

      this.setState({
        isModal: false,
        restaurants: this.#restaurants.getRestaurants(),
      });
    }

    if (type === 'cancel') {
      this.setState({ isModal: false });
    }
  }
}

export default App;

import AddModalContainer from './components/AddModalContainer';
import FilterBar from './components/FilterBar';
import ListContainer from './components/ListContainer';
import TopNavBar from './components/TopNavBar';
import { Category, Order } from './constants/enum';
import Component from './core/Component';
import { IComponentPropState } from './interfaces/IComponent';
import IRestaurantInput from './interfaces/IRestaurantInput';
import {
  getLocalStorageItems,
  setLocalStorageItem,
} from './utils/localStroageUtils';
import sortItemsByName from './utils/sortByName';
import defaultDummyRestaurantsData from './constants/defaultDummyRestaurantsData';

class App extends Component<IComponentPropState> {
  setup() {
    this.$state = {
      isModalOpened: false,
      restaurantList: this.getRestaurants(),
      filterOptions: { category: '전체', order: '이름순' },
      isAddFormValid: true,
    };
  }

  template() {
    return `<header class="gnb">
  </header>
  <main>
    <section class="restaurant-filter-container"></section>
    <section class="restaurant-list-container"></section>
    

    <section class="restaurant-add-modal-container"></section>


    
  </main>`;
  }

  mounted() {
    const { toggleModal, addRestaurant, filterList } = this;
    const $topNavBar = this.$target.querySelector<HTMLHeadingElement>('.gnb');
    const $addModalContainer = this.$target.querySelector<HTMLElement>(
      '.restaurant-add-modal-container'
    );
    const $filterBar = this.$target.querySelector<HTMLElement>(
      '.restaurant-filter-container'
    );
    const $listContainer = this.$target.querySelector<HTMLElement>(
      '.restaurant-list-container'
    );

    if ($topNavBar) {
      new TopNavBar($topNavBar, {
        toggleModal: toggleModal.bind(this),
      });
    }

    if ($addModalContainer) {
      new AddModalContainer($addModalContainer, {
        toggleModal: toggleModal.bind(this),
        isModalOpened: this.$state.isModalOpened,
        addRestaurant: addRestaurant.bind(this),
      });
    }

    if ($filterBar) {
      new FilterBar($filterBar, {
        filterList: filterList.bind(this),
        filterOptions: this.$state.filterOptions,
      });
    }

    if ($listContainer) {
      new ListContainer($listContainer, {
        restaurantList: this.$state.restaurantList,
      });
    }
  }

  toggleModal(): void {
    const { isModalOpened } = this.$state;
    this.setState({ isModalOpened: !isModalOpened });
  }

  addRestaurant(restaurantInput: IRestaurantInput) {
    const restaurantList: IRestaurantInput[] =
      this.getRestaurants() === defaultDummyRestaurantsData
        ? []
        : this.getRestaurants();

    restaurantList.push(restaurantInput);

    setLocalStorageItem('restaurantList', restaurantList);

    this.setState({ restaurantList });
  }

  filterList(category: Category, order: Order) {
    const categoryFilteredList = this.getFilteredListByCategory(
      this.getRestaurants(),
      category
    );

    switch (order) {
      case Order.Name:
        sortItemsByName(categoryFilteredList);
        break;
      case Order.Distance:
        categoryFilteredList.sort(
          (first, second) => +first.distance - +second.distance
        );
        break;
    }

    this.setState({
      restaurantList: categoryFilteredList,
      filterOptions: { category, order },
    });
  }

  getFilteredListByCategory(
    restaurantList: IRestaurantInput[],
    category: Category
  ) {
    if (category === Category.All) {
      return restaurantList;
    }

    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  getRestaurants(): IRestaurantInput[] {
    return (
      getLocalStorageItems('restaurantList') || defaultDummyRestaurantsData
    );
  }
}

export default App;

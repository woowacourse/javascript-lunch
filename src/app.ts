import FilterBar from './components/FilterBar';
import ListContainer from './components/ListContainer';
import AddModalContainer from './components/AddModalContainer';
import TopNavBar from './components/TopNavBar';
import { Category, Order } from './constants/enum';
import Component from './core/Component';
import IRestaurantInput from './interfaces/IRestaurantInput';
import { $ } from './utils/domUtils';
import sortItemsByName from './utils/sortByName';
import { restaurantStore } from './model/restaurantStore';
import { sampleData } from './model/storage';
class App extends Component {
  readonly component: any;
  constructor() {
    super($('#app'));

    this.component = {
      topNavBar: new TopNavBar($('.gnb')),
      listContainer: new ListContainer($('.restaurant-list-container')),
      filterBar: new FilterBar($('.restaurant-filter-container')),
      AddModalContainer: new AddModalContainer(
        $('.restaurant-add-modal-container')
      ),
    };

    restaurantStore.setList(sampleData);
  }

  addRestaurant(restaurantInput: IRestaurantInput) {
    const restaurantList: IRestaurantInput[] = this.getRestaurants();
    restaurantList.push(restaurantInput);

    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));
  }

  filterList(category: Category, order: Order) {
    const categoryFilteredList = this.getFilteredListByCategory(
      this.getRestaurants(),
      category
    );

    if (order === Order.Name) {
      sortItemsByName(categoryFilteredList);
    }

    if (order === Order.Distance) {
      categoryFilteredList.sort(
        (first, second) => +first.distance - +second.distance
      );
    }
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
    return JSON.parse(localStorage.getItem('restaurantList') || '[]');
  }
}

export default App;

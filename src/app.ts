import Component from './core/Component';
import IRestaurantInput from './interfaces/IRestaurantInput';
import { restaurantInputValidator } from './validator/restaurantInputValidator';

class App extends Component {
  setup() {
    this.$state = {};
  }

  template() {
    return `<div><h1>Hello</h1></div>`;
  }

  mounted() {
    const { toggleModal, addRestaurant, filterList, getRestaurants } = this;
    const $topNavBar = this.$target.querySelector('.gnb');
    const $filterBar = this.$target.querySelector(
      '.restaurant-filter-container'
    );
    const $listContainer = this.$target.querySelector(
      '.restaurant-list-container'
    );

    // new TopNavBar($topNavBar, {
    //   toggleModal: toggleModal.bind(this),
    //   addRestaurant: addRestaurant.bind(this),
    // });

    // new FilterBar($filterBar, {
    //   filterList: filterList.bind(this),
    // });

    // new ListContainer($listContainer, {
    //   showRestaurants: getRestaurants.bind(this),
    // });
  }

  toggleModal() {}

  addRestaurant(restaurantInput: IRestaurantInput) {
    const originalRestaurantList: IRestaurantInput[] = this.getRestaurants();

    localStorage.setItem(
      'restaurantList',
      JSON.stringify(originalRestaurantList.push(restaurantInput))
    );
  }

  filterList() {}

  getRestaurants(): IRestaurantInput[] {
    return JSON.parse(localStorage.getItem('restaurantList') || '[]');
  }
}

export default App;

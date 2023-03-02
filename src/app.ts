import AddModalContainer from './components/AddModalContainer';
import TopNavBar from './components/TopNavBar';
import { Category, Order } from './constants/enum';
import Component from './core/Component';
import IRestaurantInput from './interfaces/IRestaurantInput';
import { restaurantInputValidator } from './validator/restaurantInputValidator';

class App extends Component {
  setup() {
    this.$state = {
      isModalOpened: false,
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
    const { toggleModal, addRestaurant, filterList, getRestaurants } = this;
    const $topNavBar = this.$target.querySelector('.gnb') as HTMLHeadingElement;
    const $addModalContainer = this.$target.querySelector(
      '.restaurant-add-modal-container'
    ) as HTMLElement;
    const $filterBar = this.$target.querySelector(
      '.restaurant-filter-container'
    );
    const $listContainer = this.$target.querySelector(
      '.restaurant-list-container'
    );

    new TopNavBar($topNavBar, {
      toggleModal: toggleModal.bind(this),
    });

    new AddModalContainer($addModalContainer, {
      toggleModal: toggleModal.bind(this),
      isModalOpened: this.$state.isModalOpened,
      addRestaurant: addRestaurant.bind(this),
    });

    // new FilterBar($filterBar, {
    //   filterList: filterList.bind(this),
    // });

    // new ListContainer($listContainer, {
    //   showRestaurants: getRestaurants.bind(this),
    // });
  }

  toggleModal(): void {
    const { isModalOpened } = this.$state;
    this.setState({ isModalOpened: !isModalOpened });
  }

  addRestaurant(restaurantInput: IRestaurantInput) {
    const originalRestaurantList: IRestaurantInput[] = this.getRestaurants();
    originalRestaurantList.push(restaurantInput);

    localStorage.setItem(
      'restaurantList',
      JSON.stringify(originalRestaurantList)
    );
  }

  filterList(category: Category, order: Order) {
    const categorySortedList = this.getRestaurants().filter((restaurant) => {
      return restaurant.category === category;
    });

    return categorySortedList.sort((first, second) => {
      return +first.distance - +second.distance;
    });
  }

  getRestaurants(): IRestaurantInput[] {
    return JSON.parse(localStorage.getItem('restaurantList') || '[]');
  }
}

export default App;

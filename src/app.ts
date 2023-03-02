import AddModalContainer from './components/AddModalContainer';
import ListContainer from './components/ListContainer';
import TopNavBar from './components/TopNavBar';
import { Category, Order } from './constants/enum';
import Component from './core/Component';
import IRestaurantInput from './interfaces/IRestaurantInput';
import { restaurantInputValidator } from './validator/restaurantInputValidator';

class App extends Component {
  setup() {
    this.$state = {
      isModalOpened: false,
      restaurantList: this.getRestaurants(),
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
    ) as HTMLElement;

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

    new ListContainer($listContainer, {
      restaurantList: this.$state.restaurantList,
    });
  }

  toggleModal(): void {
    const { isModalOpened } = this.$state;
    this.setState({ isModalOpened: !isModalOpened });
  }

  addRestaurant(restaurantInput: IRestaurantInput) {
    const restaurantList: IRestaurantInput[] = this.getRestaurants();
    restaurantList.push(restaurantInput);

    localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

    this.setState({ restaurantList });
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

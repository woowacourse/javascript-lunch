import Header from './components/Header.js';
import RestaurantList from './RestaurantList.js';
import AddRestaurantModal from './modal/AddRestaurantModal.js';

class App {
  constructor() {
    this.#init();
  }

  #init() {
    this.#createAppContainer();
    this.#initAppUI();
  }

  #createAppContainer() {
    this.appContainer = document.createElement('div');
    this.appContainer.id = 'app';
    this.appContainer.classList.add('app');
    document.body.appendChild(this.appContainer);

    this.restaurantListContainer = document.createElement('section');
    this.restaurantListContainer.classList.add('restaurant-list-container');

    this.restaurantList = document.createElement('ul');
    this.restaurantList.classList.add('restaurant-list');
    this.restaurantList.id = 'restaurant-list';

    this.restaurantListContainer.appendChild(this.restaurantList);
    this.appContainer.appendChild(this.restaurantListContainer);
  }

  #initAppUI() {
    this.addRestaurantModal = new AddRestaurantModal(this.appContainer, this.restaurantListContainer);
    const modalClickHandler = () => {
      this.addRestaurantModal.openModal();
    };
    new Header({ appContainer: this.appContainer, onClickIcon: modalClickHandler });

    new RestaurantList(this.restaurantListContainer);
  }
}

export default App;

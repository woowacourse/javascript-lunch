import PlusButton from '../components/button/PlusButton';
import RestaurantFilterContainer from '../components/filter/RestaurantFilterContainer';
import Header from '../components/Header';
import RestaurantItem from '../components/restaurant/RestaurantItem';
import RestaurantList from '../components/restaurant/RestaurantList';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import ModalController from './modalController';

class AppController {
  modalController;
  restaurants;

  constructor() {
    this.modalController = new ModalController();
    this.restaurants = new Restaurants();
  }

  init() {
    this.renderHeader();
    this.renderFilterContainer();
    this.renderRestaurantList();
    this.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({ title: '점심 뭐 먹지', right: PlusButton({ onclick: this.modalController.open }) });
    body?.prepend(header);
  }

  renderFilterContainer() {
    const main = $('main');

    const filterContainer = RestaurantFilterContainer();
    main?.prepend(filterContainer);
  }

  renderRestaurantList() {
    const main = $('main');

    main?.appendChild(RestaurantList({ restaurants: this.restaurants.items }));
  }

  renderModal() {
    const main = $('main');

    if (main) {
      this.modalController.attachTo(main);
      this.modalController.attachModalEvents();
      this.modalController.attachFormSubmitEvent((data) => this.addRestaurantItem(data));
    }
  }

  addRestaurantItem(restaurant: Restaurant) {
    const item = RestaurantItem({ restaurant });

    $('.restaurant-list')?.appendChild(item);
    this.restaurants.addRestaurant(restaurant);
  }
}

export default AppController;

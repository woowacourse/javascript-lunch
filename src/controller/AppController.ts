import PlusButton from '../components/button/PlusButton';
import Header from '../components/Header';
import RestaurantIcon from '../components/restaurant/RestaurantIcon';
import RestaurantItem from '../components/restaurant/RestaurantItem';
import RestaurantList from '../components/restaurant/RestaurantList';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import { $ } from '../util/selector';
import ModalController from './modalController';

class AppController {
  modalController;

  constructor() {
    this.modalController = new ModalController();
  }

  init() {
    this.renderHeader();
    this.renderRestaurantList();
    this.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({ title: '점심 뭐 먹지', right: PlusButton({ onclick: this.modalController.open }) });
    body?.prepend(header);
  }

  renderRestaurantList() {
    const main = $('main');
    const restaurants = new Restaurants();

    main?.appendChild(RestaurantList({ restaurants: restaurants.items }));
  }

  renderModal() {
    const main = $('main');

    if (main) {
      this.modalController.attachTo(main);
      this.modalController.attachModalEvents();
      this.modalController.attachFormSubmitEvent(this.addRestaurantItem);
    }
  }

  addRestaurantItem({ name, distance, description, category }: Restaurant) {
    const item = RestaurantItem({
      name,
      distance,
      description,
      icon: RestaurantIcon({ category }),
    });

    $('.restaurant-list')?.appendChild(item);
  }
}

export default AppController;

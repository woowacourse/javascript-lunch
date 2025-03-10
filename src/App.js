import PlusButton from './components/button/PlusButton.js';
import Header from './components/Header.js';
import RestaurantIcon from './components/restaurant/RestaurantIcon.js';
import RestaurantItem from './components/restaurant/RestaurantItem.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import ModalController from './controller/modalController.js';
import { $ } from './util/selector.js';

class App {
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
    body.prepend(header);
  }

  renderRestaurantList() {
    const main = $('main');

    main.appendChild(RestaurantList());
  }

  renderModal() {
    const main = $('main');
    this.modalController.attachTo(main);
    this.modalController.attachModalEvents();
    this.modalController.attachFormSubmitEvent(this.addRestaurantItem);
  }

  addRestaurantItem({ name, distance, description, category }) {
    const item = RestaurantItem({
      name,
      distance,
      description,
      icon: RestaurantIcon({ src: `images/category-${category}.png`, alt: category }),
    });

    $('.restaurant-list').appendChild(item);
  }
}

export default App;

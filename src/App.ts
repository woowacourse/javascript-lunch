import Header from './components/Header';
import Modal from './components/Modal';
import FilterSection from './components/FilterSection';
import RestaurantList from './components/RestaurantList';
import RestaurantListItem from './domain/RestaurantListItem';
import RestaurantStorage from './domain/RestaurantStorage';
import { ID } from './constants';

class App {
  #app;
  #restaurantListItem;

  constructor() {
    this.#app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const initialRestaurantList = RestaurantStorage.get();
    this.#restaurantListItem = new RestaurantListItem(initialRestaurantList);
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${FilterSection.template()}
        ${RestaurantList.template(this.#restaurantListItem.getListItem())}
        ${Modal.template()}
      </main>`;

    this.#setEvent();
  }

  #setEvent() {
    Header.setEvent();
    FilterSection.setEvent(this.#restaurantListItem);
    Modal.setEvent(this.#restaurantListItem);
  }
}

export default App;

import Header from './components/Header';
import Menu from './components/Menu';
import FilterSection from './components/FilterSection';
import RestaurantListSection from './components/RestaurantListSection';
import AddModal from './components/AddModal';
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
        ${Menu.template()}
        ${FilterSection.template()}
        ${RestaurantListSection.template(this.#restaurantListItem.getListItem())}

        ${AddModal.template()}
      </main>`;

    this.#setEvent();
  }

  #setEvent() {
    Header.setEvent();
    Menu.setEvent(this.#restaurantListItem);
    FilterSection.setEvent(this.#restaurantListItem);
    RestaurantListSection.setEvent(this.#restaurantListItem);
    AddModal.setEvent(this.#restaurantListItem);
  }
}

export default App;

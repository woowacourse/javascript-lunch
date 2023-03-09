import Header from './components/Header';
import AddModal from './components/AddModal';
import FilterSection from './components/FilterSection';
import RestaurantList from './components/RestaurantList';
import RestaurantListItem from './domain/RestaurantListItem';
import RestaurantStorage from './domain/RestaurantStorage';
import { ID } from './constants';
import Menu from './components/Menu';

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
        ${RestaurantList.template(this.#restaurantListItem.getListItem())}

        ${AddModal.template()}
      </main>`;

    this.#setEvent();
  }

  #setEvent() {
    Header.setEvent();
    Menu.setEvent(this.#restaurantListItem);
    FilterSection.setEvent(this.#restaurantListItem);
    RestaurantList.setEvent(this.#restaurantListItem);
    AddModal.setEvent(this.#restaurantListItem);
  }
}

export default App;

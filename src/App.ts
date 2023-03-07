import Header from './components/Header';
import FilterButton from './components/FilterButton';
import RestaurantList from './components/RestaurantList';
import SortButton from './components/SortButton';
import RestaurantListItem from './domain/RestaurantListItem';
import RestaurantStorage from './domain/RestaurantStorage';
import Modal from './components/Modal';

class App {
  #app;
  #restaurantListItem;

  constructor() {
    this.#app = document.querySelector('#app') as HTMLDivElement;
    const initialRestaurantList = RestaurantStorage.get();
    this.#restaurantListItem = new RestaurantListItem(initialRestaurantList);
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        <section class="restaurant-filter-container">
          ${FilterButton.template()}
          ${SortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${RestaurantList.template(this.#restaurantListItem.getListItem())}
        </section>

        <div class="modal">
          ${Modal.template()}
        </div>
      </main>`;

    this.#setEvent();
  }

  #setEvent() {
    Header.setEvent();
    FilterButton.setEvent(this.#restaurantListItem);
    SortButton.setEvent(this.#restaurantListItem);
    Modal.setEvent(this.#restaurantListItem);
  }
}

export default App;

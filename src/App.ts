import Header from './components/Header';
import Modal from './components/Modal';
import FilterSection from './components/FilterSection';
import RestaurantList from './components/RestaurantList';
import RestaurantListItem from './domain/RestaurantListItem';
import RestaurantStorage from './domain/RestaurantStorage';

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
          ${FilterSection.template()}
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
    FilterSection.setEvent(this.#restaurantListItem);
    Modal.setEvent(this.#restaurantListItem);
  }
}

export default App;

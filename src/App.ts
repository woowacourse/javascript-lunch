import AddButton from './components/AddButton';
import CategoryInput from './components/CatgoryInput';
import DescriptionInput from './components/DescriptionInput';
import DistanceInput from './components/DistanceInput';
import FilterButton from './components/FilterButton';
import Header from './components/Header';
import LinkInput from './components/LinkInput';
import ModalButton from './components/ModalButton';
import ModalHeader from './components/ModalHeader';
import NameInput from './components/NameInput';
import RestaurantList from './components/RestaurantList';
import SortButton from './components/SortButton';
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
          ${FilterButton.template()}
          ${SortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${RestaurantList.template(this.#restaurantListItem.getListItem())}
        </section>

        <div class="modal">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${ModalHeader.template()}
            <form id="addForm">
              ${CategoryInput.template()}
              ${NameInput.template()}
              ${DistanceInput.template()}
              ${DescriptionInput.template()}
              ${LinkInput.template()}
              ${AddButton.template()}
            </form>
          </div>
        </div>
      </main>
    `;
    this.#setEvent();
  }

  #setEvent() {
    FilterButton.setEvent(this.#restaurantListItem);
    ModalButton.setEvent();
    SortButton.setEvent(this.#restaurantListItem);
    AddButton.setEvent(this.#restaurantListItem);
  }
}

export default App;

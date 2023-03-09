import RestaurantFilter from './components/RestaurantFilter';
import Header from './components/Header';
import SortButton from './components/SortButton';
import RestaurantList from './components/RestaurantList';
import ModalButton from './components/ModalButton';
import ModalHeader from './components/ModalHeader';
import AddButton from './components/AddButton';
import CategoryInput from './components/CategoryInput';
import NameInput from './components/NameInput';
import DistanceInput from './components/DistanceInput';
import DescriptionInput from './components/DescriptionInput';
import LinkInput from './components/LinkInput';

class App {
  #app;
  #restaurantList;

  constructor() {
    this.#app = document.querySelector('#app') as HTMLElement;
    this.#restaurantList = new RestaurantList();
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        <section class="restaurant-filter-container">
          ${RestaurantFilter.template()}
          ${SortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${this.#restaurantList.template()}
        </section>

        <div class="modal modal--open">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${ModalHeader.template()}
            <form>
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
    RestaurantFilter.setEvent();
    ModalButton.setEvent();
    SortButton.setEvent();
  }
}

export default App;

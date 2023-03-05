import AddButton from "./components/AddButton";
import CategoryInput from "./components/CategoryInput";
import DescriptionInput from "./components/DescriptionInput";
import DistanceInput from "./components/DistanceInput";
import FilterButton from "./components/FilterButton";
import Header from "./components/Header";
import LinkInput from "./components/LinkInput";
import ModalButton from "./components/ModalButton";
import ModalHeader from "./components/ModalHeader";
import NameInput from "./components/NameInput";
import RestaurantList from "./components/RestaurantList";
import SortButton from "./components/SortButton";
import { mockList } from "./data/mockRestaurant";
import { Template } from "./Template";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantList.defaultList(mockList);
  }

  render() {
    this.#app.innerHTML = `
      ${Template.mainHeader}
      <main>
        <section class="restaurant-filter-container">
          ${Template.filterButton}
          ${Template.sortByButton}
        </section>
        <section class="restaurant-list-container">
          ${Template.restaurantList(RestaurantList.originList)}
        </section>

        <div class="modal">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${Template.modalHeader}
            <form>
              ${Template.categoryInput}
              ${Template.nameInput}
              ${Template.takeTimeInput}
              ${Template.descriptionInput}
              ${Template.linkInput}
              ${Template.addButton}
            </form>
          </div>
        </div>
      </main>
    `;
    this.#setEvent();
  }

  #setEvent() {
    FilterButton.setEvent();
    ModalButton.setEvent();
    SortButton.setEvent();
    AddButton.setEvent();
  }
}

export default App;

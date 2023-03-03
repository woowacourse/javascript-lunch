import AddButton from "./components/AddButton";
import CategoryInput from "./components/CatgoryInput";
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

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantList.defaultList(mockList);
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
          ${RestaurantList.template(RestaurantList.originList)}
        </section>

        <div class="modal">
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
    FilterButton.setEvent();
    ModalButton.setEvent();
    SortButton.setEvent();
    AddButton.setEvent();
  }
}

export default App;

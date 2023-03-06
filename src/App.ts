import addEventBottomSheet from "./components/BottomSheet";
import BottomSheetButton from "./components/BottomSheetButton";
import addEventFilterSortButton from "./components/FilterSortButton";
import { RestaurantList } from "./RestaurantList";
import { mockList } from "./data/mockRestaurant";
import { Template } from "./Template";
import { BottomSheet } from "./until/ControlDom";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantList.list = mockList;
    RestaurantList.settingList();
  }

  render() {
    this.#app.innerHTML = `
      ${Template.mainHeader()}
      <main>
        <section class="restaurant-filter-container">
          ${Template.filterButton}
          ${Template.sortByButton}
        </section>
        <section class="restaurant-list-container">
          ${Template.restaurantList(RestaurantList.list)}
        </section>

        <div class="bottomSheet">
          <div class="bottomSheet-backdrop"></div>
          <div class="bottomSheet-container">
            ${Template.bottomSheetHeader}
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
    this.setEvent();
  }

  setEvent() {
    BottomSheetButton.setEvent();
    addEventBottomSheet.addRestaurant();
    addEventFilterSortButton();
  }
}

export default App;

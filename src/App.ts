import BottomSheet from "./components/BottomSheet";
import BottomSheetOpenButton from "./components/BottomSheetOpenButton";
import FilterSortButton from "./components/FilterSortButton";
import { RestaurantService } from "./domain/RestaurantService";
import { mockList } from "./data/mockRestaurant";
import { Template } from "./Template";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantService.list = mockList;
    RestaurantService.settingList();
    localStorage.clear();
  }

  render() {
    this.#app.innerHTML = `
      ${Template.mainHeader(BottomSheetOpenButton.template())}
      <main>
        <section class="restaurant-filter-container">
          ${FilterSortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${Template.restaurantList(RestaurantService.list)}
        </section>
      </main>
      ${BottomSheet.template()}`;
    this.setEvent();
  }

  setEvent() {
    BottomSheetOpenButton.openBottomSheet();
    BottomSheet.addRestaurant();
    FilterSortButton.FilterSort();
  }
}

export default App;

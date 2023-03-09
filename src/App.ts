import InputForm from "./components/InputSheet/InputForm";
import InputFormOpenButton from "./components/MainPage/InputFormOpenButton";
import FilterSortButton from "./components/MainPage/FilterSortButton";
import { RestaurantService } from "./domain/RestaurantService";
import { mockList } from "./data/mockRestaurant";
import { MainHeader } from "./components/MainPage/MainHeader";
import { RestaurantList } from "./components/MainPage/RestaurantList";

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
      ${MainHeader.template(InputFormOpenButton.template())}
      <main>
        <section class="restaurant-filter-container">
          ${FilterSortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${RestaurantList.template(RestaurantService.list)}
        </section>
      </main>
      ${InputForm.template()}`;
    this.setEvent();
  }

  setEvent() {
    InputFormOpenButton.openBottomSheet();
    InputForm.addRestaurant();
    FilterSortButton.FilterSort();
  }
}

export default App;

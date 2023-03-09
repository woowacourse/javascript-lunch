import InputForm from "./components/InputSheet/InputForm";
import InputFormOpenButton from "./components/MainPage/InputFormOpenButton";
import FilterSortButton from "./components/MainPage/FilterSortButton";
import { RestaurantService } from "./domain/RestaurantService";
import { mockList } from "./data/mockRestaurant";
import { MainHeader } from "./components/MainPage/MainHeader";
import { RestaurantList } from "./components/MainPage/RestaurantList";
import { ListChooseSection } from "./components/MainPage/ListChooseSection";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantService.allList = mockList;
    RestaurantService.settingList();
    localStorage.clear();
  }

  render() {
    this.#app.innerHTML = `
      ${MainHeader.template(InputFormOpenButton.template())}
      <main>
        ${ListChooseSection.template()}
        <section class="restaurant-filter-container">
          ${FilterSortButton.template()}
        </section>
        <section class="restaurant-list-container">
          ${RestaurantList.template(RestaurantService.allList)}
        </section>
      </main>
      ${InputForm.template()}`;
    this.setEvent();
  }

  setEvent() {
    InputFormOpenButton.openBottomSheet();
    InputForm.addRestaurant();
    FilterSortButton.filterSort();
    RestaurantList.setEvent();
    ListChooseSection.setEvent();
  }
}

export default App;

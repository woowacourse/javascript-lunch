import InputForm from "./components/InputSheet/InputForm";
import InputFormOpenButton from "./components/MainPage/InputFormOpenButton";
import FilterSortButton from "./components/MainPage/FilterSortButton";
import { RestaurantData } from "./domain/RestaurantData";
import { mockList } from "./data/mockRestaurant";
import { MainHeader } from "./components/MainPage/MainHeader";
import { RestaurantList } from "./components/MainPage/RestaurantList";
import { ListChooseSection } from "./components/MainPage/ListChooseSection";

class App {
  #app;

  constructor() {
    this.#app = document.querySelector("#app") as HTMLElement;
    RestaurantData.allList = mockList;
    RestaurantData.settingList();
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
          ${RestaurantList.template(RestaurantData.allList)}
        </section>
      </main>
      ${InputForm.template()}`;
    this.setEvent();
  }

  setEvent() {
    InputFormOpenButton.setEvent();
    InputForm.addRestaurant();
    FilterSortButton.setEvent();
    RestaurantList.setEvent();
    ListChooseSection.setEvent();
  }
}

export default App;

import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantForm from "./components/restaurant-form-section/restaurant-form/RestaurantForm.js";

export default class App {
  constructor() {
    this.restaurantList = [];
    this.#initElement();
  }

  #addList = (newRestaurantInfo) => {
    this.restaurantList = [...this.restaurantList, newRestaurantInfo];
    this.#renderRestaurantList();
  };

  #renderRestaurantList() {
    const $listContainer = document.querySelector(".restaurant-list-container");
    this.$main.replaceChild(
      new RestaurantList(this.restaurantList).render(),
      $listContainer
    );
  }

  #initElement() {
    const $body = document.querySelector("body");
    $body.append(
      new Header({ onOpen: () => this.$bottomSheet.open() }).render()
    );

    this.$main = document.createElement("main");
    $body.append(this.$main);

    this.$restaurantList = new RestaurantList(this.restaurantList);

    this.$bottomSheet = new BottomSheetBase({
      title: "새로운 음식점",
      $children: new RestaurantForm({
        onSubmit: (newRestaurantInfo) => {
          this.#addList(newRestaurantInfo);
          this.$bottomSheet.close();
        },
        onCancel: () => this.$bottomSheet.close(),
      }).render(),
    });

    this.$main.append(
      this.$restaurantList.render(),
      this.$bottomSheet.render()
    );
  }
}

new App();

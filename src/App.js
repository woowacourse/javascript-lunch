import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";

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
    $body.appendChild(new Header().render());

    this.$main = document.createElement("main");
    $body.appendChild(this.$main);

    this.$main.appendChild(new RestaurantList(this.restaurantList).render());
    this.$main.appendChild(
      new BottomSheetBase({
        title: "새로운 음식점",
        $children: new RestaurantForm(this.#addList).render(),
      }).render()
    );
  }
}

new App();

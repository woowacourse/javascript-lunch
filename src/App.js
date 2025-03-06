import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";

export default class App {
  constructor() {
    this.#initElement();
  }

  #initElement() {
    const $body = document.querySelector("body");
    $body.appendChild(new Header().render());

    const $main = document.createElement("main");
    $body.appendChild($main);

    $main.appendChild(new RestaurantList().render());
    $main.appendChild(
      new BottomSheetBase({
        title: "새로운 음식점",
        $children: new RestaurantForm().render(),
      }).render()
    );
  }
}

new App();

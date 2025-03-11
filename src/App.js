import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.js";

export default class App {
  constructor() {
    this.restaurantListModel = new RestaurantListModel();
    this.#initElement();
  }

  #updateList = (newRestaurantList) => {
    this.updateRestautantList(newRestaurantList);
    this.updateRestaurantListUI();
  };

  updateRestaurantListUI() {
    this.#renderRestaurantList();
    this.#resetForm();
  }

  updateRestautantList(newRestaurantList) {
    this.restaurantListModel.updateRestautantList(newRestaurantList);
  }

  #resetForm() {
    const $addButton = document.querySelector(".button--primary");

    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");
  }

  #renderRestaurantList() {
    const $listContainer = document.querySelector(".restaurant-list-container");
    this.$main.replaceChild(
      new RestaurantList(this.restaurantListModel.getRestaurantList()).render(),
      $listContainer
    );
  }

  #initElement() {
    const $body = document.querySelector("body");
    $body.appendChild(new Header().render());

    this.$main = document.createElement("main");
    $body.appendChild(this.$main);

    this.$main.appendChild(
      new RestaurantList(this.restaurantListModel.getRestaurantList()).render()
    );

    const $restaurantForm = new RestaurantForm(
      this.#updateList,
      this.restaurantListModel.getRestaurantList()
    ).render();

    this.$main.appendChild(
      new BottomSheetBase({
        title: "새로운 음식점",
        $children: $restaurantForm,
      }).render()
    );
  }
}

new App();

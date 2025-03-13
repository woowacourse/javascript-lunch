import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.js";
import RestaurantNavigator from "./components/restaurantListSection/restaurantNavigator/RestaurantNavigator.js";

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

  updateRestautantList = (newRestaurantList) => {
    this.restaurantListModel.updateRestautantList(newRestaurantList);
  };

  #resetForm() {
    const $addButton = document.querySelector(".button--primary");

    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");
  }

  #renderRestaurantList() {
    const $listContainer = document.querySelector(".restaurant-list-container");

    this.$listSection.replaceChild(
      new RestaurantList(this.restaurantListModel.getRestaurantList()).render(),
      $listContainer
    );
  }

  #initElement() {
    const $body = document.querySelector("body");
    $body.appendChild(new Header().render());

    const $main = document.createElement("main");
    $body.appendChild($main);

    this.$listSection = document.createElement("div");
    this.$listSection.className = "list-section";

    const $listHeader = new RestaurantNavigator(
      this.restaurantListModel.getRestaurantList(),
      this.#updateList
    ).render();

    this.$listSection.append(
      $listHeader,
      new RestaurantList(this.restaurantListModel.getRestaurantList()).render()
    );
    $main.appendChild(this.$listSection);

    const $restaurantForm = new RestaurantForm(
      this.#updateList,
      this.restaurantListModel.getRestaurantList()
    ).render();

    $main.appendChild(
      new BottomSheetBase({
        title: "새로운 음식점",
        $children: $restaurantForm,
      }).render()
    );
  }
}

new App();

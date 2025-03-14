import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.js";
import RestaurantNavigator from "./components/restaurantListSection/restaurantNavigator/RestaurantNavigator.js";
import RestaurantFilterSection from "./components/restaurantListSection/restaurantFilterSection/RestaurantFilterSection.js";

export default class App {
  #selectedTab;

  constructor() {
    this.restaurantListModel = new RestaurantListModel();
    this.#selectedTab = "all";
    this.#initElement();
  }

  #updateSelected = (selected) => {
    this.#selectedTab = selected;

    const $tap = document.querySelector(".restaurant-list-header");

    const restaurantList = this.restaurantListModel.getRestaurantList();

    $tap.replaceWith(
      new RestaurantNavigator(
        this.#selectedTab,
        this.#updateSelected,
        restaurantList,
        this.#updateList
      ).render()
    );

    const $filterSection = document.querySelector(
      ".restaurant-filter-container"
    );
    $filterSection.replaceWith(
      new RestaurantFilterSection(
        restaurantList,
        this.#updateList,
        this.#selectedTab
      ).render()
    );
  };

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

    const restaurantList = this.restaurantListModel.getRestaurantList();

    const $listHeader = new RestaurantNavigator(
      this.#selectedTab,
      this.#updateSelected,
      restaurantList,
      this.#updateList
    ).render();

    this.$listSection.appendChild(
      new RestaurantFilterSection(
        restaurantList,
        this.#updateList,
        this.#selectedTab
      ).render()
    );

    this.$listSection.append(
      $listHeader,
      new RestaurantList(
        restaurantList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      ).render()
    );
    $main.appendChild(this.$listSection);

    const $restaurantForm = new RestaurantForm(
      this.#updateList,
      restaurantList
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

import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.js";
import RestaurantNavigator from "./components/restaurantListSection/restaurantNavigator/RestaurantNavigator.js";
import RestaurantFilterSection from "./components/restaurantListSection/restaurantFilterSection/RestaurantFilterSection.js";
import { setItem, RESTAURANT_LIST_KEY } from "./components/utils/storage.js";

export default class App {
  #selectedTab;
  #restaurantList;
  #category;
  #sorting;

  constructor() {
    this.restaurantListModel = new RestaurantListModel();
    this.#selectedTab = "all";
    this.#restaurantList = this.restaurantListModel.getRestaurantList();
    this.#category = "전체";
    this.#sorting = "이름순";

    this.#initElement();
  }

  #updateSelectValue = (value, type) => {
    if (type === "category") this.#category = value;
    if (type === "sorting") this.#sorting = value;

    const $filterSection = document.querySelector(
      ".restaurant-filter-container"
    );
    $filterSection.replaceWith(
      new RestaurantFilterSection(
        this.restaurantListModel.getRestaurantList(),
        this.#updateRestautantList,
        this.#selectedTab,
        this.#category,
        this.#sorting,
        this.#updateSelectValue
      ).render()
    );
  };

  #updateRestautantList = (newRestaurantList) => {
    this.#restaurantList = newRestaurantList;
    this.updateRestaurantListUI();
  };

  #updateLocalRestautantList = (newRestaurantList) => {
    this.restaurantListModel.updateRestautantList(newRestaurantList);
    setItem(RESTAURANT_LIST_KEY, newRestaurantList);
    this.#updateRestautantList(newRestaurantList);
  };

  #updateSelected = (selected) => {
    this.#selectedTab = selected;

    const $tap = document.querySelector(".restaurant-list-header");
    const restaurantList = this.restaurantListModel.getRestaurantList();

    $tap.replaceWith(
      new RestaurantNavigator(
        this.#selectedTab,
        this.#updateSelected,
        restaurantList,
        this.#updateRestautantList
      ).render()
    );

    const $filterSection = document.querySelector(
      ".restaurant-filter-container"
    );
    $filterSection.replaceWith(
      new RestaurantFilterSection(
        restaurantList,
        this.#updateRestautantList,
        this.#selectedTab,
        this.#category,
        this.#sorting,
        this.#updateSelectValue
      ).render()
    );
  };

  updateRestaurantListUI() {
    this.#renderRestaurantList();
    this.#resetForm();
  }

  #resetForm() {
    const $addButton = document.querySelector(".button--primary");

    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");
  }

  #renderRestaurantList() {
    const $listContainer = document.querySelector(".restaurant-list-container");

    this.$listSection.replaceChild(
      new RestaurantList(
        this.#restaurantList,
        this.#updateLocalRestautantList
      ).render(),
      $listContainer
    );

    const restaurantList = this.restaurantListModel.getRestaurantList();

    const $filterSection = document.querySelector(
      ".restaurant-filter-container"
    );
    $filterSection.replaceWith(
      new RestaurantFilterSection(
        restaurantList,
        this.#updateRestautantList,
        this.#selectedTab,
        this.#category,
        this.#sorting,
        this.#updateSelectValue
      ).render()
    );

    const $tap = document.querySelector(".restaurant-list-header");

    $tap.replaceWith(
      new RestaurantNavigator(
        this.#selectedTab,
        this.#updateSelected,
        restaurantList,
        this.#updateRestautantList
      ).render()
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
      this.#selectedTab,
      this.#updateSelected,
      this.#restaurantList,
      this.#updateRestautantList
    ).render();

    this.$listSection.appendChild(
      new RestaurantFilterSection(
        this.#restaurantList,
        this.#updateRestautantList,
        this.#selectedTab,
        this.#category,
        this.#sorting,
        this.#updateSelectValue
      ).render()
    );

    this.$listSection.append(
      $listHeader,
      new RestaurantList(
        this.#restaurantList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ),
        this.#updateLocalRestautantList
      ).render()
    );
    $main.appendChild(this.$listSection);

    const $restaurantForm = new RestaurantForm(
      this.#updateLocalRestautantList,
      this.#restaurantList
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

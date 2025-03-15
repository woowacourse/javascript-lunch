import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.js";
import RestaurantNavigator from "./components/restaurantListSection/restaurantNavigator/RestaurantNavigator.js";
import RestaurantFilterSection from "./components/restaurantListSection/restaurantFilterSection/RestaurantFilterSection.js";
import { setItem, RESTAURANT_LIST_KEY } from "./components/utils/storage.js";
import RestaurantDetail from "./components/restaurantDetail/RestaurantDetail.js";

export default class App {
  #selectedTab;
  #restaurantList;
  #category;
  #sorting;

  #addModalShow;
  #detailModalShow;
  #selectedRestaurant;

  constructor() {
    this.restaurantListModel = new RestaurantListModel();
    this.#selectedTab = "all";
    this.#restaurantList = this.restaurantListModel.getRestaurantList();
    this.#category = "전체";
    this.#sorting = "이름순";
    this.#addModalShow = false;
    this.#detailModalShow = false;
    this.#selectedRestaurant = {};

    this.#initElement();
  }

  onRestaurantItemClick = (e) => {
    if (e.target.closest(".restaurant__bookmark")) return;

    const id = Number(e.target.closest(".restaurant").id);

    const restaurant = this.#restaurantList.find(
      (restaurant) => restaurant.id === id
    );

    this.#selectedRestaurant = restaurant;
    this.#toggleDetailModalShow();
  };

  #toggleDetailModalShow = () => {
    this.#detailModalShow = !this.#detailModalShow;
    this.#renderDetailModal();
  };

  #toggleAddModalShow = () => {
    this.#addModalShow = !this.#addModalShow;
    this.#renderAddModal();
  };

  #renderDetailModal = () => {
    const $modal = document.querySelector("#datail-modal");

    const $restaurantDetail = new RestaurantDetail(
      this.#selectedRestaurant,
      this.#updateRestautantList,
      this.#toggleDetailModalShow
    ).render();

    $modal.replaceWith(
      new BottomSheetBase({
        $children: $restaurantDetail,
        show: this.#detailModalShow,
        toggleShow: this.#toggleDetailModalShow,
        id: "datail-modal",
      }).render()
    );
  };

  #renderAddModal = () => {
    const $modal = document.querySelector("#add-modal");

    const $restaurantForm = new RestaurantForm(
      this.#updateLocalRestautantList,
      this.#restaurantList
    ).render();

    $modal.replaceWith(
      new BottomSheetBase({
        title: "새로운 음식점",
        $children: $restaurantForm,
        show: this.#addModalShow,
        toggleShow: this.#toggleAddModalShow,
        id: "add-modal",
      }).render()
    );
  };
  //

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

    const $tap = document.querySelector(".restaurant-list-header");

    $tap.replaceWith(
      new RestaurantNavigator(
        this.#selectedTab,
        this.#updateSelected,
        this.restaurantListModel.getRestaurantList(),
        this.#updateRestautantList,
        { category: this.#category, sorting: this.#sorting }
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
        this.#updateRestautantList,
        { category: this.#category, sorting: this.#sorting }
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
        this.#updateLocalRestautantList,
        this.onRestaurantItemClick
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
        this.#updateRestautantList,
        { category: this.#category, sorting: this.#sorting }
      ).render()
    );
  }

  #initElement() {
    const $body = document.querySelector("body");
    $body.appendChild(new Header(this.#toggleAddModalShow).render());

    const $main = document.createElement("main");
    $body.appendChild($main);

    this.$listSection = document.createElement("div");
    this.$listSection.className = "list-section";

    const $listHeader = new RestaurantNavigator(
      this.#selectedTab,
      this.#updateSelected,
      this.#restaurantList,
      this.#updateRestautantList,
      { category: this.#category, sorting: this.#sorting }
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
        this.#updateLocalRestautantList,
        this.onRestaurantItemClick
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
        show: this.#addModalShow,
        toggleShow: this.#toggleAddModalShow,
        id: "add-modal",
      }).render()
    );

    $main.appendChild(
      new BottomSheetBase({
        show: this.#detailModalShow,
        toggleShow: this.#toggleDetailModalShow,
        id: "datail-modal",
      }).render()
    );
  }
}

new App();

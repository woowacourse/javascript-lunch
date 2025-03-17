import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";
import RestaurantListModel from "./domain/RestaurantListModel.ts";
import RestaurantNavigator from "./components/restaurantListSection/restaurantNavigator/RestaurantNavigator.js";
import RestaurantFilterSection from "./components/restaurantListSection/restaurantFilterSection/RestaurantFilterSection.js";
import { setItem, RESTAURANT_LIST_KEY, getItem } from "./utils/storage.js";
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
    const originRestaurantList = getItem(RESTAURANT_LIST_KEY, []);

    this.restaurantListModel = new RestaurantListModel(originRestaurantList);
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

  #updateBookmark = (id, isBookmark) => {
    const originRestaurantList = this.restaurantListModel.getRestaurantList();

    const index = this.#restaurantList.findIndex(
      (restaurant) => restaurant.id === id
    );
    const originIndex = originRestaurantList.findIndex(
      (restaurant) => restaurant.id === id
    );

    const copy = [...this.#restaurantList];
    const originCopy = [...originRestaurantList];

    copy[index] = { ...copy[index], bookmark: isBookmark };
    originCopy[originIndex] = {
      ...originCopy[originIndex],
      bookmark: isBookmark,
    };

    this.#updateLocalRestautantList(originCopy);
    this.#updateRestautantList(copy);
  };

  #onRestaurantItemDelete = (id) => {
    const restaurantIndex = this.#restaurantList.findIndex(
      (restaurant) => restaurant.id === id
    );

    const restaurantList = this.restaurantListModel.getRestaurantList();
    const newList = restaurantList.filter((_, i) => i !== restaurantIndex);

    this.#updateLocalRestautantList(newList);
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
    const $restaurantDetail = new RestaurantDetail(
      this.#selectedRestaurant,
      this.#restaurantList,
      this.#updateLocalRestautantList,
      this.#toggleDetailModalShow,
      this.#onRestaurantItemDelete
    ).render();

    this.#renderModal("#datail-modal", $restaurantDetail, {
      show: this.#detailModalShow,
      toggleShow: this.#toggleDetailModalShow,
    });
  };

  #renderAddModal = () => {
    const $restaurantForm = new RestaurantForm(
      this.#updateLocalRestautantList,
      this.#restaurantList
    ).render();

    this.#renderModal("#add-modal", $restaurantForm, {
      title: "새로운 음식점",
      show: this.#addModalShow,
      toggleShow: this.#toggleAddModalShow,
    });
  };

  #renderModal = (modalId, innerComponent, options = {}) => {
    const $modal = document.querySelector(modalId);

    const bottomSheetOptions = {
      $children: innerComponent,
      id: modalId.replace("#", ""),
      ...options,
    };

    $modal.replaceWith(new BottomSheetBase(bottomSheetOptions).render());
  };

  #updateSelectValue = (value, type) => {
    if (type === "category") this.#category = value;
    if (type === "sorting") this.#sorting = value;

    this.#renderFilterAndNavigation();
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

    this.#renderFilterAndNavigation();
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
        this.#updateBookmark,
        this.onRestaurantItemClick
      ).render(),
      $listContainer
    );

    this.#renderFilterAndNavigation();
  }

  #renderFilterAndNavigation() {
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

    const $filterSection = new RestaurantFilterSection(
      this.#restaurantList,
      this.#updateRestautantList,
      this.#selectedTab,
      this.#category,
      this.#sorting,
      this.#updateSelectValue
    ).render();

    this.$listSection.append(
      $listHeader,
      $filterSection,
      new RestaurantList(
        this.#restaurantList.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ),
        this.#updateBookmark,
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

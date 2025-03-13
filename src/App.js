import Header from "./components/header/Header.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantForm from "./components/restaurant-form-section/restaurant-form/RestaurantForm.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";
import RestaurantFilter from "./components/restaurant-filter-section/restaurantFilter.js";

export default class App {
  constructor(restaurantStore, restaurantService) {
    this.restaurantStore = restaurantStore;
    this.restaurantService = restaurantService;

    this.render();
    this.restaurantStore.subscribe(() => this.#updateRestaurantList());
  }

  render() {
    this.$body = document.querySelector("body");
    this.#renderHeader();
    this.#renderMain();
  }

  #renderHeader() {
    const $header = new Header({ onOpen: () => this.$bottomSheet.open() });
    this.$body.append($header.render());
  }

  #renderMain() {
    this.$main = document.createElement("main");
    this.$body.append(this.$main);

    this.#renderRestaurantFilter();
    this.#renderRestaurantList();
    this.#renderBottomSheet();
  }

  #renderRestaurantFilter() {
    this.$restaurantFilter = new RestaurantFilter();
    this.$main.append(this.$restaurantFilter.render());
  }

  #renderRestaurantList() {
    this.$restaurantList = new RestaurantList(
      this.restaurantService.getRestaurants()
    );
    this.$main.append(this.$restaurantList.render());
  }

  #renderBottomSheet() {
    const $restaurantForm = new RestaurantForm({
      onSubmit: this.#handleFormSubmit.bind(this),
      onCancel: () => this.$bottomSheet.close(),
    });

    this.$bottomSheet = new BottomSheetBase({
      title: "새로운 음식점",
      $children: $restaurantForm.render(),
    });

    this.$main.append(this.$bottomSheet.render());
  }

  #handleFormSubmit(newRestaurantInfo) {
    this.restaurantService.addRestaurant(newRestaurantInfo);
    this.$bottomSheet.close();
  }

  #updateRestaurantList() {
    const restaurantList = this.restaurantService.getRestaurants();
    this.$restaurantList.update(restaurantList);
  }
}

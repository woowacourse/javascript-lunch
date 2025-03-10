import Header from "./components/header/Header.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantForm from "./components/restaurant-form-section/restaurant-form/RestaurantForm.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";

export default class App {
  constructor(restaurantStore, restaurantService) {
    this.restaurantStore = restaurantStore;
    this.restaurantService = restaurantService;

    this.render();
    this.restaurantStore.subscribe(() => this.#renderRestaurantList());
  }

  render() {
    const $body = document.querySelector("body");
    $body.append(
      new Header({ onOpen: () => this.$bottomSheet.open() }).render()
    );

    this.$main = document.createElement("main");
    $body.append(this.$main);

    this.$restaurantList = new RestaurantList(
      this.restaurantService.getRestaurants()
    );

    this.$restaurantForm = new RestaurantForm({
      onSubmit: (newRestaurantInfo) => {
        this.restaurantService.addRestaurant(newRestaurantInfo);
        this.$bottomSheet.close();
      },
      onCancel: () => this.$bottomSheet.close(),
    });

    this.$bottomSheet = new BottomSheetBase({
      title: "새로운 음식점",
      $children: this.$restaurantForm.render(),
    });

    this.$main.append(
      this.$restaurantList.render(),
      this.$bottomSheet.render()
    );
  }

  #renderRestaurantList() {
    const restaurantList = this.restaurantService.getRestaurants();
    this.$restaurantList.update(restaurantList);
  }
}

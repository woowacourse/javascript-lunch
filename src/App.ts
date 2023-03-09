import Header from "./UI/Header";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import RestaurantList from "./domain/RestaurantList";
import RestaurantContainer from "./UI/RestaurantContainer";
import RestaurantItem from "./UI/RestaurantItem";
import { sortByDistance, sortByName } from "./utils/Sort";
import { getLocalStorage } from "./utils/LocalStorage";
import { KEY, CATEGORY_NAME } from "./constants";
import { $ } from "./utils/Dom";
import Tab from "./UI/Tab";
import RestaurantModal from "./UI/RestaurantModal";
import Store from "./Store";
import { Category, RestaurantForm } from "./types.d";

export class App {
  private store = new Store();
  private restaurantList = new RestaurantList(this.store);
  private restaurantItem = new RestaurantItem();

  constructor() {
    new Header();
    new FilterBar(this.restaurantList, this.restaurantItem);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.store);
    Tab();
    this.init();

    this.handleSelectedValue();
    this.handleSortedValue();
  }

  init() {
    const localStorageData = getLocalStorage(KEY);
    this.store.setRestaurantList(localStorageData);
    const initialData = this.store.getRestaurantList();
    this.sortRestaurants(initialData);
    if (initialData !== null)
      initialData.forEach((restaurant: RestaurantForm) => {
        this.restaurantItem.render(restaurant);
      });
    this.clickItem();
    this.toggleFavorite();
  }

  sortRestaurants(restaurants: RestaurantForm[]) {
    const sorted = $("#sorting-filter") as HTMLSelectElement;
    const sortedValue = sorted.options[sorted.selectedIndex].value;
    if (sortedValue === "name") sortByName(restaurants);
    if (sortedValue === "distance") sortByDistance(restaurants);
  }

  clickItem() {
    $(".restaurant-list-container")?.addEventListener("click", (e) => {
      const id = (e.target as HTMLLIElement).closest(".restaurant__info")?.id;
      const restaurants = this.store.getRestaurantList();
      restaurants.forEach((restaurant: RestaurantForm) => {
        if (restaurant.id === Number(id)) {
          new RestaurantModal(restaurant);
        }
      });
    });
  }

  toggleFavorite() {
    $(".restaurant-list-container")?.addEventListener("click", (e) => {
      const id = (e.target as HTMLButtonElement).closest(".favorite")?.id;
      this.setFavorite(id);
    });
  }

  setFavorite(id: string | undefined) {
    if (id) {
      const restaurants = this.store.getRestaurantList();
      restaurants.forEach((restaurant: RestaurantForm) => {
        if (restaurant.favorite === false && restaurant.id === Number(id)) {
          restaurant.favorite = true;
        }
      });
    }
  }

  handleSelectedValue() {
    const selected = $("#category-filter") as HTMLSelectElement;
    selected.addEventListener("change", () => {
      const selectedValue = selected.options[selected.selectedIndex]
        .value as Category;
      this.filterCategory(selectedValue);
    });
  }

  handleSortedValue(selectedValue?: string) {
    const sorted = $("#sorting-filter") as HTMLSelectElement;
    sorted.addEventListener("change", () => {
      const sortedValue = sorted.options[sorted.selectedIndex].value;
      if (sortedValue === "name") this.filterByName(selectedValue || "");
      if (sortedValue === "distance")
        this.filterByDistance(selectedValue || "");
    });
  }

  filterCategory(selectedValue: Category) {
    const restaurantItems = $(".restaurant-list") as HTMLLIElement;
    restaurantItems.replaceChildren();
    const selectedList = this.getSelectedList(selectedValue);
    this.handleSortedValue(selectedValue);
    this.render(selectedList);
  }

  filterByName(selectedValue: string) {
    const restaurantItems = $(".restaurant-list") as HTMLLIElement;
    restaurantItems.replaceChildren();
    const selectedList = this.getSelectedList(selectedValue);
    sortByName(selectedList);
    this.render(selectedList);
  }

  filterByDistance(selectedValue: string) {
    const restaurantItems = $(".restaurant-list") as HTMLLIElement;
    restaurantItems.replaceChildren();
    const selectedList = this.getSelectedList(selectedValue);
    sortByDistance(selectedList);
    this.render(selectedList);
  }

  getSelectedList(selectedValue: string) {
    return selectedValue === CATEGORY_NAME.total
      ? this.store.getRestaurantList()
      : this.store.getFilteredList(selectedValue);
  }

  render(restaurantParsedInfo: RestaurantForm[]) {
    restaurantParsedInfo.forEach((restaurant) => {
      this.restaurantItem.render(restaurant);
    });
  }
}

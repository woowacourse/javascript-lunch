import Header from "./UI/Header";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import RestaurantList from "./domain/RestaurantList";
import RestaurantContainer from "./UI/RestaurantContainer";
import RestaurantItem from "./UI/RestaurantItem";
import { sortByDistance, sortByName } from "./utils/Sort";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStorage";
import { KEY, CATEGORY_NAME, CATEGORY_IMG } from "./constants";
import { $, $$ } from "./utils/Dom";
import Tab from "./UI/Tab";
import RestaurantDetail from "./UI/RestaurantDetail";
import Store from "./Store";
import { Category, RestaurantForm } from "./global/types";

export class App {
  private restaurantList = new RestaurantList();
  private restaurantItem = new RestaurantItem();

  constructor() {
    new Header();
    new FilterBar();
    new RestaurantContainer();
    new Modal(this.restaurantList);
    new Tab();
    this.init();

    this.handleSelectedValue();
    this.handleSortedValue();
    this.renderFavorite();
  }

  init() {
    const localStorageData = getLocalStorage(KEY);
    Store.setRestaurantList(localStorageData);
    const initialData = Store.getRestaurantList();
    Store.setFilteredList(CATEGORY_NAME.total);
    if (initialData !== null)
      initialData.forEach((restaurant: RestaurantForm) => {
        this.restaurantItem.render(restaurant, $(".restaurant-list"));
      });
    this.sortRestaurants(initialData);
    this.addEvent();
  }

  addEvent() {
    this.openDetailModal();
    const restaurantList = $(".restaurant-list") as HTMLLIElement;
    const favoriteList = $(".favorite-list") as HTMLLIElement;
    this.toggleFavorite(restaurantList);
    this.toggleFavorite(favoriteList);
  }

  sortRestaurants(restaurants: RestaurantForm[]) {
    const sorted = $("#sorting-filter") as HTMLSelectElement;
    const sortedValue = sorted.options[sorted.selectedIndex].value;
    if (sortedValue === "name") sortByName(restaurants);
    if (sortedValue === "distance") sortByDistance(restaurants);
  }

  openDetailModal() {
    const restaurantWrapper = $(".restaurant-wrapper") as HTMLDivElement;
    restaurantWrapper.addEventListener("click", this.initDetailModal);
  }

  initDetailModal = (event: Event) => {
    const list = (event.target as HTMLLIElement).closest(".restaurant__info");
    if (list) {
      const id = list.id;
      const restaurants = Store.getRestaurantList();
      restaurants.forEach((restaurant: RestaurantForm) => {
        if (restaurant.id !== id) return;
        const modal = new RestaurantDetail(restaurant);
        this.removeItem(modal, restaurant);
        this.toggleModalFavorite(restaurant);
      });
    }
  };

  toggleFavorite(list: HTMLLIElement) {
    list?.addEventListener("click", (event) => {
      const id = (event.target as HTMLButtonElement).closest(".favorite")?.id;
      this.setFavorite(id, event);
    });
  }

  setFavorite(id: string | undefined, event: Event) {
    const restaurants = Store.getRestaurantList();
    restaurants.forEach((restaurant: RestaurantForm) => {
      if (id && restaurant.id === id) {
        restaurant.favorite = !restaurant.favorite;
        this.handleFavorite();
        this.toggleFavoriteButton(restaurant.favorite, event);
      }
    });
  }

  handleFavorite() {
    this.renderFavorite();
    this.setInfoLocalStorage();
  }

  renderFavorite() {
    const restaurantList = $(".restaurant-list") as HTMLLIElement;
    restaurantList.replaceChildren();
    this.render(Store.getFilteredList(), restaurantList);
    const favoriteList = $(".favorite-list") as HTMLLIElement;
    favoriteList.replaceChildren();
    this.render(Store.getFavoriteList(), favoriteList);
  }

  toggleFavoriteButton(isFavorite: boolean, event: Event) {
    (event.target as HTMLButtonElement).setAttribute(
      "src",
      isFavorite ? CATEGORY_IMG.filled : CATEGORY_IMG.lined
    );
  }

  toggleModalFavorite(restaurant: RestaurantForm) {
    const modalFavorite = $(".modal-favorite") as HTMLElement;
    modalFavorite.addEventListener("click", (event) => {
      restaurant.favorite = !restaurant.favorite;
      this.toggleFavoriteButton(restaurant.favorite, event);
      this.renderFavorite();
    });
  }

  handleSelectedValue() {
    const selectCategory = $("#category-filter") as HTMLSelectElement;
    selectCategory.addEventListener("change", () => {
      const selectedValue = selectCategory.options[selectCategory.selectedIndex]
        .value as Category;
      this.filterCategory(selectedValue);
    });
  }

  handleSortedValue(selectedValue?: string) {
    const sorted = $("#sorting-filter") as HTMLSelectElement;
    sorted.addEventListener("change", () => {
      const sortedValue = sorted.options[sorted.selectedIndex].value;
      if (sortedValue === "name") this.filterHandler(selectedValue, sortByName);
      if (sortedValue === "distance")
        this.filterHandler(selectedValue, sortByDistance);
    });
  }

  filterCategory(selectedValue: Category) {
    const { restaurantItems, selectedList } = this.getItemsList(selectedValue);
    this.handleSortedValue(selectedValue);
    this.render(selectedList, restaurantItems);
  }

  filterHandler(
    selectedValue: string | Category = "",
    filter: CallableFunction
  ) {
    const { restaurantItems, selectedList } = this.getItemsList(selectedValue);
    filter(selectedList);
    this.render(selectedList, restaurantItems);
  }

  getSelectedList(selectedValue: string) {
    return selectedValue === CATEGORY_NAME.total || selectedValue === ""
      ? this.setTotalList()
      : this.setSelectedList(selectedValue);
  }

  getItemsList(selectedValue: string) {
    const restaurantItems = this.resetItems();
    const selectedList = this.getSelectedList(selectedValue);
    return { restaurantItems, selectedList };
  }

  resetItems() {
    const restaurantItems = $(".restaurant-list") as HTMLLIElement;
    restaurantItems.replaceChildren();
    return restaurantItems;
  }

  setTotalList() {
    Store.setFilteredList(CATEGORY_NAME.total);
    return Store.getFilteredList();
  }

  setSelectedList(selectedValue: string) {
    Store.setFilteredList(selectedValue);
    return Store.getFilteredList();
  }

  removeItem(modal: RestaurantDetail, restaurantInfo: RestaurantForm) {
    const removeButton = $(".remove-button") as HTMLButtonElement;
    removeButton.addEventListener("click", () => {
      Store.deleteRestaurantItem(restaurantInfo);
      this.setInfoLocalStorage();
      const restaurantList = $(".restaurant-list") as HTMLLIElement;
      const favoriteList = $(".favorite-list") as HTMLLIElement;
      restaurantList.replaceChildren();
      favoriteList.replaceChildren();
      this.render(Store.getFilteredList(), restaurantList);
      this.render(Store.getFavoriteList(), favoriteList);
      modal.closeModal();
    });
  }

  setInfoLocalStorage() {
    const restaurantString = JSON.stringify(
      Store.getRestaurantList().map((info) => info)
    );
    setLocalStorage(KEY, restaurantString);
  }

  render = (restaurantParsedInfo: RestaurantForm[], list: HTMLLIElement) => {
    restaurantParsedInfo.forEach((restaurant) => {
      this.restaurantItem.render(restaurant, list);
    });
  };
}

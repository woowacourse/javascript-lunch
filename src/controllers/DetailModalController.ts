import { detailModalControllerType } from "../../types/detailModal.ts";
import RestaurantList from "../domain/RestaurantList.ts";
import EventHandler from "../utils/EventHandler.ts";
import createDetailModalView from "../view/createDetailModalView.js";

class DetailModalController {
  modalElement: HTMLElement;
  restaurantList: RestaurantList;
  restaurantName;
  updateCategorySortListView;
  updateFavoriteListView;

  constructor({
    restaurantName,
    restaurantList,
    updateCategorySortListView,
    updateFavoriteListView,
  }: detailModalControllerType) {
    this.restaurantList = restaurantList;
    this.restaurantName = restaurantName;
    this.updateCategorySortListView = updateCategorySortListView;
    this.updateFavoriteListView = updateFavoriteListView;

    const restaurant = restaurantList.getRestaurantByName(restaurantName)?.restaurant;
    this.modalElement = createDetailModalView(restaurant);

    this.registerEvents();
  }

  getElement() {
    return this.modalElement;
  }

  registerEvents() {
    const deleteButtonElement = this.modalElement.querySelector("button[type='submit']") as HTMLButtonElement;
    const closeButtonElement = this.modalElement.querySelector("button[type='button']") as HTMLButtonElement;
    const modalBackdropElement = this.modalElement.querySelector(".modal-backdrop") as HTMLDivElement;

    closeButtonElement.addEventListener("click", this.handleCloseClick.bind(this));
    modalBackdropElement.addEventListener("click", this.handleCloseClick.bind(this));
    deleteButtonElement.addEventListener("click", this.handleDeleteClick.bind(this));
  }

  handleCloseClick() {
    EventHandler.modalToggle(this.modalElement);
  }

  handleDeleteClick() {
    this.restaurantList.removeRestaurant(this.restaurantName);
    this.updateCategorySortListView();
    this.updateFavoriteListView();
    EventHandler.modalToggle(this.modalElement);
  }
}

export default DetailModalController;

import RestaurantType from "../../types/restaurant.ts";
import RestaurantList from "../domain/RestaurantList.ts";
import EventHandler from "../utils/EventHandler.ts";
import createModalView from "../view/createModalView.js";

interface ModalControllerType {
  updateCategorySortListView: () => void;
  restaurantList: RestaurantList;
}

class ModalController {
  modalElement;
  formElement;
  restaurantList;
  updateCategorySortListView;

  constructor({ updateCategorySortListView, restaurantList }: ModalControllerType) {
    const { modalElement, formElement } = createModalView();
    this.modalElement = modalElement;
    this.formElement = formElement;
    this.restaurantList = restaurantList;
    this.updateCategorySortListView = updateCategorySortListView;

    this.registerEvents();
  }

  getModalElement() {
    return this.modalElement;
  }

  render(container: HTMLElement) {
    return container.appendChild(this.modalElement);
  }

  registerEvents() {
    const closeButtonElement = this.formElement.querySelector("button[type='button']") as HTMLButtonElement;
    const modalBackdropElement = this.modalElement.querySelector(".modal-backdrop") as HTMLDivElement;

    closeButtonElement.addEventListener("click", this.handleCloseClick.bind(this));
    modalBackdropElement.addEventListener("click", this.handleCloseClick.bind(this));
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleCloseClick() {
    EventHandler.modalToggle(this.modalElement, this.formElement);
  }

  handleSubmit(event: SubmitEvent) {
    const formData = EventHandler.formDataParsing(event);

    const restaurantData: RestaurantType = {
      category: String(formData["category"]) as RestaurantType["category"],
      name: String(formData["name"]),
      distance: String(formData["distance"]) as RestaurantType["distance"],
      description: String(formData["description"] || ""),
      link: String(formData["link"] || ""),
      favoriteStar: false,
    };

    this.restaurantList.addRestaurant(restaurantData);
    this.updateCategorySortListView();
    EventHandler.modalToggle(this.modalElement, this.formElement);
  }
}

export default ModalController;

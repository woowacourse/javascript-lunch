import RestaurantType from "../../types/restaurant.ts";
import RestaurantList from "../domain/RestaurantList.ts";
import EventHandler from "../utils/EventHandler.ts";

interface ModalEventHandlerType {
  modalElement: HTMLElement;
  formElement: HTMLFormElement;
  updateCategorySortListView: () => void;
  restaurantList: RestaurantList;
}

function ModalEventHandler({
  modalElement,
  formElement,
  updateCategorySortListView,
  restaurantList,
}: ModalEventHandlerType) {
  const closeButtonElement = formElement.querySelector("button[type='button']") as HTMLButtonElement;
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop") as HTMLDivElement;

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));

  formElement.addEventListener("submit", (event: SubmitEvent) => {
    const formData = EventHandler.formDataParsing(event);

    const restaurantData: RestaurantType = {
      category: String(formData["category"]) as RestaurantType["category"],
      name: String(formData["name"]),
      distance: String(formData["distance"]) as RestaurantType["distance"],
      description: String(formData["description"] || ""),
      link: String(formData["link"] || ""),
      favoriteStar: false,
    };

    restaurantList.addRestaurant(restaurantData);
    updateCategorySortListView();
    EventHandler.modalToggle(modalElement, formElement);
  });
}

export default ModalEventHandler;

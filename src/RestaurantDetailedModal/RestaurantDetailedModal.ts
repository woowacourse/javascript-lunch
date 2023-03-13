import Modal from "../Modal/Modal";
import addFavoriteButtonCallback from "./features/addFavoriteButtonCallback";
import PersonalRestaurant from "../type/PersonalRestaurant";
import addCloseButtonCallback from "./features/addCloseButtonCallback";
import addDeleteButtonCallback from "./features/addDeleteButtonCallback";
import createDetailedElement from "./UI/createDetailedElement";

class RestaurantDetailedModal extends Modal {
  public info: PersonalRestaurant = {} as PersonalRestaurant;

  constructor(id: string) {
    super(id);
  }

  openModalEventCallback(event: CustomEvent) {
    (this.element.querySelector(".modal-container") as HTMLElement).innerHTML = "";

    this.info = event.detail.info;

    this.element.querySelector(".modal-container")?.appendChild(
      createDetailedElement(event.detail.info)
    );
    console.log('asdf');
    addCloseButtonCallback(this);
    addDeleteButtonCallback(this);
    addFavoriteButtonCallback(this);

    this.open();
  }
}

export default RestaurantDetailedModal;

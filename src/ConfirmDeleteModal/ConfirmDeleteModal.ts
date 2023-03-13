import Modal from "../Modal/Modal";
import addCancelEvent from "./features/addCancelEvent";
import addDeleteEvent from "./features/addDeleteEvent";
import TEMPLATE from "./UI/template";

class ConfirmDeleteModal extends Modal {
  constructor(id: string) {
    super(id);
  }
  
  openCallback(event: CustomEvent) {
    (this.element.querySelector(".modal-container") as HTMLElement).innerHTML = TEMPLATE;
    (this.element.querySelector("h1") as HTMLElement).innerHTML = event.detail.info.restaurant.name;

    addCancelEvent(this);
    addDeleteEvent(this, event);

    this.open();
  }
}

export default ConfirmDeleteModal;

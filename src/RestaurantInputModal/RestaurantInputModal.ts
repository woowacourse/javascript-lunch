import Modal from "../Modal/Modal";
import addCloseModalCallback from "./features/addCloseModalCallback";
import addSubmitCallback from "./features/addSubmitCallback";
import addValidatorCallback from "./features/addValidatorCallbacks";
import createForm from "./UI/createForm";

class RestaurantInputModal extends Modal{
  constructor(id: string) {
    super(id);
    this.element.querySelector(".modal-container")?.appendChild(createForm());

    addCloseModalCallback(this);
    addSubmitCallback(this);
    addValidatorCallback(this);
  }

  // override
  open() {
    this.element.querySelector("form")?.reset();
    if (!this.element.classList.contains("modal--open")) {
      this.element.classList.add("modal--open");
    }
  }
}

export default RestaurantInputModal;

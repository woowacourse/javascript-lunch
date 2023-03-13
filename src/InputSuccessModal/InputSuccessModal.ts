import Modal from "../Modal/Modal";
import addChangeToAllEvent from "./features/addChangeToAllEvent";
import addCloseEvent from "./features/addCloseEvent";
import TEMPLATE from "./UI/template";

class InputSuccessModal extends Modal {
  constructor(id: string) {
    super(id);
    (this.element.querySelector(".modal-container") as HTMLElement).innerHTML = TEMPLATE;

    addCloseEvent(this);
    addChangeToAllEvent(this);
  }
  
  submitSuccessCallback(event: CustomEvent) {
    this.open();
  }
}

export default InputSuccessModal;

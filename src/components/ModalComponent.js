import CustomElement from "../abstracts/CustomElement";
import ModalAddFormComponent from "./ModalAddFormComponent";

class ModalComponent extends CustomElement {
  template() {
    return `
    <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <modal-add-form></modal-add-form>
        </div>
      </div>
    `;
  }
}

customElements.define("modal-element", ModalComponent);

export default ModalComponent;

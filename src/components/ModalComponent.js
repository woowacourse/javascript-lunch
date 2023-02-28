import CustomElement from "../abstracts/CustomElement";
import RestaurantAddFormComponent from "./RestaurantAddFormComponent";

class ModalComponent extends CustomElement {
  template() {
    return `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <restaurant-add-form></restaurant-add-form>
        </div>
      </div>
    `;
  }
}

customElements.define("modal-element", ModalComponent);

export default ModalComponent;

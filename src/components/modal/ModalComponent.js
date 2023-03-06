import CustomElement from "../../abstracts/CustomElement";

class ModalComponent extends CustomElement {
  template() {
    return `
      <div class="modal">
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

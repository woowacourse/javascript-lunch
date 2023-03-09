import CustomElement from "../../abstracts/CustomElement";

class ModalComponent extends CustomElement {
  template() {
    return `
      <div id="add_modal" class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <restaurant-add-form></restaurant-add-form>
        </div>
      </div>
      <div id="detail_modal" class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <restaurant-detail></restaurant-detail>
        </div>
      </div>
    `;
  }
}

customElements.define("modal-element", ModalComponent);

export default ModalComponent;

import CustomElement from "../../abstracts/CustomElement";
import ModalInstance from "../../domain/ModalStore";
import dispatcher from "../../domain/Dispatcher";

class ModalComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ModalInstance.subscribe(this);
    ModalInstance.publish();
  }

  rerender(isModalOn) {
    if (isModalOn) {
      this.querySelector(".modal").classList.add("modal--open");
      return;
    }
    this.querySelector(".modal").classList.remove("modal--open");
  }

  handleEvent() {
    this.querySelector(".button--secondary").addEventListener("click", () =>
      dispatcher("modal_off", false)
    );
  }

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

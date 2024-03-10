import "./CommonModal.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

class CommonModal extends BaseComponent {
  protected render() {
    const children = this.getAttribute("children");

    this.innerHTML = `
        <dialog id="common-modal-dialog">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            ${children}
          </div>
        </dialog>
      `;
  }
}

customElements.define("common-modal", CommonModal);

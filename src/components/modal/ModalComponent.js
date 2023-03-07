import CustomElement from "../../abstracts/CustomElement";
import ModalInstance from "../../domain/ModalStore";
import dispatcher from "../../domain/Dispatcher";

class ModalComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ModalInstance.subscribe(this);
  }

  rerender(isModalOn) {
    if (isModalOn) {
      this.shadowRoot.querySelector(".modal").classList.add("modal--open");
      return;
    }
    this.shadowRoot.querySelector(".modal").classList.remove("modal--open");
  }

  template() {
    return `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        .modal {
          display: none;
        }      

        .modal--open {
          display: block;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
        
          background: rgba(0, 0, 0, 0.35);
        }
        
        .modal-container {
          position: fixed;
          bottom: 0;
          width: 100%;
        
          padding: 32px 16px;
        
          border-radius: 8px 8px 0px 0px;
          background: var(--grey-100);
          z-index: 100;
        }
      </style>
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

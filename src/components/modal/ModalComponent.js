import CustomElement from "../../abstracts/CustomElement";
import ModalInstance from "../../domain/ModalStore";
import dispatcher from "../../domain/Dispatcher";
import RestaurantInfoComponent from "./RestaurantInfoComponent";

class ModalComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    ModalInstance.subscribe(this);
  }

  modalOnOff(isModalOn) {
    if (isModalOn) {
      this.shadowRoot.querySelector(".modal").classList.add("modal--open");
      return;
    }
    this.shadowRoot.querySelector(".modal").classList.remove("modal--open");
    const modalContainer = this.shadowRoot.querySelector(".modal-container");
    modalContainer.innerHTML = ``;
  }

  rerender(isModalOn, action) {
    this.modalOnOff(isModalOn);
    const modalType = action.type;
    const modalContainer = this.shadowRoot.querySelector(".modal-container");
    console.log(modalContainer.children.length);
    if (
      modalType === "modal_add_restaurant" &&
      modalContainer.children.length === 0
    ) {
      modalContainer.innerHTML = `<restaurant-add-form></restaurant-add-form>`;
    }
    if (
      modalType === "modal_restaurant_info" &&
      action.data &&
      modalContainer.children.length === 0
    ) {
      modalContainer.innerHTML = `<restaurant-info id=${action.data}></restaurant-info>`;
    }
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
          height: auto;
          border-radius: 8px 8px 0px 0px;
          background: var(--grey-100);
          z-index: 100;
        }
      </style>
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
        </div>
      </div>
    `;
  }
}

customElements.define("modal-element", ModalComponent);

export default ModalComponent;

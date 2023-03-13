import CustomElement from "../../abstracts/CustomElement";
import ModalInstance from "../../domain/store/ModalStore";
import RestaurantInfoComponent from "./RestaurantInfoComponent";
import RestaurantAddFormComponent from "./RestaurantAddFormComponent";
import { MODAL_ACTION } from "../../abstracts/constants";

class ModalComponent extends CustomElement {
  #modal;
  #modalContainer;

  connectedCallback() {
    super.connectedCallback();
    ModalInstance.subscribe(this);
    this.#modal = this.shadowRoot.querySelector(".modal");
    this.#modalContainer = this.shadowRoot.querySelector(".modal-container");
  }

  modalOn() {
    this.#modal.classList.add("modal--open");
  }

  modalOff() {
    this.#modal.classList.remove("modal--open");
    this.#modalContainer.innerHTML = ``;
  }

  selectModalType(modalType, action) {
    switch (modalType) {
      case MODAL_ACTION.MODAL_ADD_RESTAURANT:
        this.#modalContainer.innerHTML = `<restaurant-add-form></restaurant-add-form>`;
        break;
      case MODAL_ACTION.MODAL_RESTAURANT_INFO:
        this.#modalContainer.innerHTML = `<restaurant-info id=${action.data}></restaurant-info>`;
        break;
      default:
        this.#modalContainer.innerHTML = `<h1>ERROR</h1>`;
        break;
    }
  }

  rerender(isModalOn, action) {
    if (isModalOn) {
      this.modalOn();

      const modalType = action.type;

      if (this.#modalContainer.childElementCount === 0) {
        this.selectModalType(modalType, action);
      }

      return;
    }

    this.modalOff();
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

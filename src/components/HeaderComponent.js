import { MODAL_ACTION } from "../abstracts/constants";
import CustomElement from "../abstracts/CustomElement";
import dispatcher from "../domain/Dispatcher";

class HeaderComponent extends CustomElement {
  handleEvent() {
    this.shadowRoot
      .querySelector(".gnb__button")
      .addEventListener("click", () =>
        dispatcher(MODAL_ACTION.MODAL_ADD_RESTAURANT)
      );
  }

  template() {
    return `
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      :host {
        position: fixed;
        width: 100vw;
        height: 64px;
        top: 0;
        z-index: 10;
      }

      .gnb {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        padding: 0 16px;
        background-color: var(--primary-color);
        height: 100%;
        width: 100%;
      }
      
      .gnb__title {
        color: #fcfcfd;
      }
      
      .gnb__button {
        height: 40px;
      
        border: none;
        border-radius: 8px;
        background: transparent;
      
        font-size: 24px;
        cursor: pointer;
      }
      
      .gnb__button img {
        display: block;
        width: 40px;
        height: 40px;
        object-fit: contain;
      }

      .text-title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }
    </style>
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가" />
      </button>
    </header>
    `;
  }
}

customElements.define("header-element", HeaderComponent);

export default HeaderComponent;

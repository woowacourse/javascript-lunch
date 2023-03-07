import addButtonImage from "../../templates/add-button.png";
import { Modal } from "./modal";

export class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButtonImage} alt="음식점 추가" />
      </button>
    `;
  }

  bindEvent() {
    this.querySelector(".gnb__button")?.addEventListener("click", () => {
      document.querySelector<Modal>(".modal")?.openFormModal();
    });
  }
}

export const createHeader = () => {
  customElements.define("custom-header", Header, { extends: "header" });
};

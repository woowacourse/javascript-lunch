import addData from "../../domain/addData.js";
import createModalInputs from "./createModalInputs.js";
import Modal from "./Modal.js";

class ModalAdd extends Modal {
  template() {
    return `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form id='input-form'>
            <div id="category" class="form-item form-item--required"></div>
            <div id="name" class="form-item form-item--required"></div>
            <div id="distance" class="form-item form-item--required"></div>
            <div id="description" class="form-item"></div>
            <div id="link" class="form-item"></div>
            <div class="button-container">
              <button id="close_button" type="button" class="button button--secondary text-caption">취소하기</button>
              <button class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        </div>
      `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    createModalInputs();
  }

  setEvent() {
    this.$target
      .querySelector(".modal-backdrop")
      ?.addEventListener("click", () => this.handleModalClose());
    this.$target
      .querySelector("#close_button")
      ?.addEventListener("click", () => this.handleModalClose());
    this.submitForm();
  }

  submitForm() {
    this.$target
      .querySelector("#input-form")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        this.handleModalClose();
        const newData = addData();
        document.dispatchEvent(
          new CustomEvent("restaurantUpdated", { detail: newData }),
        );
      });
  }
}

export default ModalAdd;

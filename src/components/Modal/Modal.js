import Component from "../Component.js";
import addData from "./addData.js";
import "./modal.css";
class Modal extends Component {
  template() {
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.props.content}
    </div>`;
  }

  render() {
    super.render();
    this.onMount();
  }

  onMount() {
    if (this.props.isModalOpen) {
      this.$target.classList.add("modal--open");
    } else {
      this.$target.classList.remove("modal--open");
    }
  }

  setEvent() {
    this.$target
      .querySelector(".modal-backdrop")
      .addEventListener("click", () => {
        this.props.toggleModal();
      });

    if (this.props.modalType === "add") {
      this.setupAddModalEvents();
    } else if (this.props.modalType === "info") {
      this.setupInfoModalEvents();
    }
  }

  setupAddModalEvents() {
    const cancelButton = this.$target.querySelector(
      ".button.button--secondary.text-caption",
    );
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        this.props.toggleModal();
      });
    }

    this.addSubmitEvent();
  }

  setupInfoModalEvents() {
    const closeButton = this.$target.querySelector(
      ".button.button--primary.text-caption",
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.props.toggleModal();
      });
    }

    const deleteButton = this.$target.querySelector(
      ".button.button--secondary.text-caption",
    );
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        // 삭제 로직 (필요하다면)
        this.props.toggleModal();
      });
    }
   
  }

  addSubmitEvent() {
    document
      .getElementById("input-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        addData();
        this.props.toggleModal();
      });
  }
}

export default Modal;

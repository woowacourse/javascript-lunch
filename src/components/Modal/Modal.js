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
    this.$target
      .querySelector(".button.button--secondary.text-caption")
      .addEventListener("click", () => {
        this.props.toggleModal();
        this.addSubmitEvent();
      });
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

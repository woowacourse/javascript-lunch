import { categoryValue, distanceValue } from "../../constants/optionValue.js";
import Component from "../Component.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Input from "../Input/Input.js";
import addData from "./addData.js";
import "./modal.css";
class Modal extends Component {
  constructor($target, props) {
    super($target, props);
  }

  template() {
    const { isModalOpen, content } = this.props;
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      ${content}
    </div>`;
  }

  render() {
    super.render();
    if (this.props.isModalOpen) {
      this.$target.classList.add("modal--open");
    } else {
      this.$target.classList.remove("modal--open");
    }
  }

  setEvent() {
    const { toggleModal } = this.props;
    this.$target
      .querySelector(".modal-backdrop")
      .addEventListener("click", () => {
        this.props.toggleModal();
      });
    this.$target
      .querySelector(".button.button--secondary.text-caption")
      .addEventListener("click", () => {
        this.props.toggleModal();
      });
    this.submitForm();
  }

  submitForm() {
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

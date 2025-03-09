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
    const { isModalOpen } = this.props;
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='input-form'>

        ${Dropdown({ id: "category", required: "required", optionValue: categoryValue })}
        ${Input({ id: "name", required: "required", type: "text" })}
        ${Dropdown({ id: "distance", required: "required", optionValue: distanceValue })}
        ${Input({ id: "description", required: "", type: "text" })}
        ${Input({ id: "link", required: "", type: "url" })}

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
    `;
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
        document.dispatchEvent(new CustomEvent("restaurantUpdated"));
      });
  }
}

export default Modal;

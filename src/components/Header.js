import { CLASS } from "../constant/variables";
import { addEvent } from "../util/addEvent";
import Modal from "./Modal";

export default class Header {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.$modal = document.querySelector(".modal");
    this.render();
    this.setEvent();
  }

  template() {
    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
        `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    addEvent(this.$target, "click", ".gnb__button", () => this.toggleModal());
  }

  toggleModal() {
    new Modal(this.$modal, { ...this.props, content: "addForm" });
    this.$modal.classList.toggle(CLASS.MODAL_OPEN);
  }
}

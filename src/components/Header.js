import "../types/restaurant";
import Component from "../core/Component";
import Modal from "./Modal";

export default class Header extends Component {
  template() {
    this.$modal = document.querySelector(".modal");

    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
        `;
  }

  mounted() {
    new Modal(this.$modal, this.props);
  }

  setEvent() {
    this.addEvent("click", ".gnb__button", this.toggleModal.bind(this));
  }

  toggleModal() {
    this.$modal.classList.toggle("modal--open");
  }
}

import AddForm from "./AddForm";
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
    this.addEvent("click", ".gnb__button", this.toggleModal.bind(this));
  }

  toggleModal() {
    new Modal(this.$modal, { ...this.props, content: "addForm" });
    this.$modal.classList.toggle("modal--open");
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}

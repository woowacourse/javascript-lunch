import "./index.css";
import AddRestaurantFormModal from "../AddRestaurantFormModal";

class ModalContainer {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
    this.setEvent();
  }

  template() {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container"></div>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  toggle() {
    this.$target.classList.toggle("modal--open");
  }

  setAddRestaurantForm(restaurantList) {
    const $modalContainer = this.$target.querySelector(".modal-container");
    const formModal = new AddRestaurantFormModal($modalContainer);

    formModal.setSubmitEvent(restaurantList, this.toggle.bind(this));
    formModal.setCancelEvent(this.toggle.bind(this));
  }

  setEvent() {
    this.$target.querySelector(".modal-backdrop").addEventListener("click", this.toggle.bind(this));
  }
}

export default ModalContainer;

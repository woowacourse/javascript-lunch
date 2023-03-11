import "./index.css";
import AddRestaurantFormModal from "../AddRestaurantFormModal";
import RestaurantDetailModal from "../RestaurantDetailModal";

class ModalContainer {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
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

  renderAddRestaurantForm(restaurantList) {
    const $modalContainer = this.$target.querySelector(".modal-container");

    const formModal = new AddRestaurantFormModal($modalContainer);
    formModal.setEvent(restaurantList);
  }

  renderRestaurantDetail(restaurantInfo, restaurantList) {
    const $modalContainer = this.$target.querySelector(".modal-container");

    const detailModal = new RestaurantDetailModal($modalContainer, restaurantInfo);
    detailModal.setEvent(restaurantList);
  }

  setOnClickBackDropEvent() {
    this.$target.querySelector(".modal-backdrop").addEventListener("click", this.toggle.bind(this));
  }

  setEvent() {
    this.setOnClickBackDropEvent();
  }
}

export default ModalContainer;

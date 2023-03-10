import "./index.css";
import AddRestaurantFormModal from "../AddRestaurantFormModal";
import RestaurantDetailModal from "../RestaurantDetailModal";

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

    new AddRestaurantFormModal($modalContainer, restaurantList);
  }

  setRestaurantDetail(restaurantInfo, restaurantList) {
    const $modalContainer = this.$target.querySelector(".modal-container");
    new RestaurantDetailModal($modalContainer, restaurantInfo, restaurantList);
  }

  setEvent() {
    this.$target.querySelector(".modal-backdrop").addEventListener("click", this.toggle.bind(this));
  }
}

export default ModalContainer;

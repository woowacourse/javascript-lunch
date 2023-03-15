import { $ } from "../../util/dom";
import Modal from "../Modal";
import "./index.css";

class Header {
  $target;

  constructor($target) {
    this.$target = $target;

    this.render();
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
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  setAddButtonClickEvent(restaurantList) {
    this.$target.querySelector(".gnb__button").addEventListener("click", () => {
      const modal = new Modal($(".modal"));
      modal.renderAddRestaurantForm(restaurantList);
    });
  }

  setEvent(modal, restaurantList) {
    this.setAddButtonClickEvent(modal, restaurantList);
  }
}

export default Header;

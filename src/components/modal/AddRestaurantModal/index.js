import Modal from "../Modal.js";
import Category from "./Category.js";
import RestaurantName from "./RestaurantName.js";
import Distance from "./Distance.js";
import Description from "./Description.js";
import Link from "./Link.js";
import { restaurants } from "../../../database/restaurants.js";

class AddRestaurantModal extends Modal {
  contents() {
    return /*html */ `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='add-restaurant-form' data-testid='add-restaurant-form'>
        ${Category()}
        ${RestaurantName()}
        ${Distance()}
        ${Description()}
        ${Link()}

        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <button type="button" id="cancel-add-restaurant-form" class="button button--secondary text-caption" data-testid="cancel-add-restaurant-form">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    if (this.state.isOpen) {
      const $cancelButton = document.querySelector(
        "#cancel-add-restaurant-form"
      );

      $cancelButton.addEventListener("click", this.handleClose);
      // cancelButton 에 관한 removeEventListener

      const $addForm = document.querySelector("#add-restaurant-form");
      $addForm.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    this.props.updateRestaurant(data);
    // form 에 관한 removeEventListener
    this.close();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.$target
      .querySelector("#cancel-add-restaurant-form")
      .removeEventListener("click", this.handleClose);

    this.$target
      .querySelector("#add-restaurant-form")
      .removeEventListener("submit", this.handleSubmit.bind(this));
  }
}

export default AddRestaurantModal;

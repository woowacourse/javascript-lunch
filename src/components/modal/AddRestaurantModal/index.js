import Modal from "../Modal.js";
import Category from "./Category.js";
import RestaurantName from "./RestaurantName.js";
import Distance from "./Distance.js";
import Description from "./Description.js";
import Link from "./Link.js";
import validateCategory from "../../../validators/validateCategory.js";
import validateRestaurantName from "../../../validators/validateRestaurantName.js";
import validateDistance from "../../../validators/validateDistance.js";
import validateDescription from "../../../validators/validateDescription.js";
import validateLink from "../../../validators/validateLink.js";

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

        <div class="button-container">
          <button type="button" id="cancel-add-restaurant-form" class="button button--secondary text-caption" data-testid="cancel-add-restaurant-form">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.isOpen) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    const $cancelButton = document.querySelector("#cancel-add-restaurant-form");
    const $addForm = document.querySelector("#add-restaurant-form");

    $cancelButton.removeEventListener("click", this.handleClose);
    $addForm.removeEventListener("submit", this.handleSubmit);

    $cancelButton.addEventListener("click", this.handleClose);
    $addForm.addEventListener("submit", this.handleSubmit);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      this.validateData(data);

      this.props.updateRestaurant(data);
      this.close();
    } catch (error) {
      alert(error.message);
    }
  };

  validateData(data) {
    const { category, name, distance, description, link } = data;
    validateCategory(category);
    validateRestaurantName(name);
    validateDistance(distance);
    validateDescription(description);
    validateLink(link);
  }
}

export default AddRestaurantModal;

import Modal from "../Modal.js";
import { $ } from "../../../utils/selector.js";

const CATEGORY_IMAGES = Object.freeze({
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
});

const imageSource = (category) => {
  return CATEGORY_IMAGES[category];
};

class RestaurantInfoModal extends Modal {
  contents() {
    const { category, name, distance, description, link } = this.state.data;

    return /*html */ `
    <div class="restaurant__info-container"> 
      <div class="restaurant__category">
        <img src="./icons/${imageSource(
          category
        )}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h2 class="restaurant__name text-subtitle">${name}</h2>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="text-body">${description}</p>
      </div>
      <div id='restaurant-info' data-testid='restaurant-info'>
        <div class="button-container">
          <button class="button button--secondary text-caption">삭제하기</button>
          <button type="button" id="cancel-restaurant-info" class="button button--primary text-caption" data-testid="cancel-restaurant-info">닫기</button>
        </div>
      </div>
    </div>
    `;
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.isOpen) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    const $cancelButton = $(document, "#cancel-restaurant-info");

    $cancelButton.removeEventListener("click", this.closeModal);

    $cancelButton.addEventListener("click", this.closeModal);
  }
}

export default RestaurantInfoModal;

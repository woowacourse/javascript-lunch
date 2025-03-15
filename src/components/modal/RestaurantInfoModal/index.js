import Modal from "../Modal.js";
import { $ } from "../../../utils/selector.js";
import filledStar from "../../../../public/icons/filledStar.svg";
import emptyStar from "../../../../public/icons/emptyStar.svg";

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
    const { category, name, distance, description, link, isFavorite, id } =
      this.props.data;

    return /*html */ `
    <div id='restaurant-info-container' class="restaurant__info-container"> 
      <button data-buttonId="${id}" type='button' class="favorite-icon-button">
        <img src=${isFavorite ? filledStar : emptyStar} class="favorite-icon"/>
      </button> 
      <div class="restaurant__detail__category">
        <img src="./icons/${imageSource(
          category
        )}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__detail__info">
        <h2 class="restaurant__detail__name text-subtitle">${name}</h2>
        <span class="restaurant__detail__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="text-body">${description}</p>
        ${
          link && `<a href=${link} class="restaurant__detail__link">${link}</a>`
        }
      </div>
      <div class="button-container">
        <button id="delete-restaurant-info" class="button button--secondary text-caption">삭제하기</button>
        <button type="button" id="cancel-restaurant-info" class="button button--primary text-caption" data-testid="cancel-restaurant-info">닫기</button>
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

  componentWillUnmount() {
    this.updateFavoriteIconInList();
  }

  updateFavoriteIconInList = () => {
    const { id, isFavorite } = this.props.data;
    const $restaurantItem = $(document, `#${id}`);
    if (!$restaurantItem) return;

    const $img = $($restaurantItem, ".favorite-icon");
    if ($img) {
      $img.src = isFavorite ? filledStar : emptyStar;
    }
  };

  addEventListeners() {
    const $cancelButton = $(document, "#cancel-restaurant-info");
    $cancelButton.removeEventListener("click", this.closeModal);
    $cancelButton.addEventListener("click", this.closeModal);

    const $deleteButton = $(
      $(document, "#restaurant-info-container"),
      "#delete-restaurant-info"
    );
    $deleteButton.addEventListener("click", this.deleteCurrentRestaurant);

    const $favoriteButton = $(this.$target, ".favorite-icon-button");
    $favoriteButton.addEventListener("click", this.toggleFavoriteRestaurant);
  }

  deleteCurrentRestaurant = () => {
    this.props.deleteRestaurant(this.props.data);
    this.close();
  };

  toggleFavoriteRestaurant = () => {
    this.props.changeLocalStorageState(this.props.data);
    this.props.data = {
      ...this.props.data,
      isFavorite: !this.props.data.isFavorite,
    };
  };
}

export default RestaurantInfoModal;

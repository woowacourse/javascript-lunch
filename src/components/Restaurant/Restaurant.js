import {
  getStoredRestaurantData,
  setStoredRestaurantData,
} from "../../domain/storeRestaurantData.ts";
import Component from "../Component.js";
import ModalDetail from "../Modal/ModalDetail.js";
class Restaurant extends Component {
  constructor($target, props) {
    super($target, props);
  }

  template() {
    const { name, distance, description, imgSrc, imgAlt, like } = this.props;
    const starImg = this.props.like ? "/filledStar.png" : "/unFilledStar.png";
    return /*html*/ ` 
      <div class="restaurant__category">
          <img src=${imgSrc} alt=${imgAlt} class="category-icon"/>
      </div>
      <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
      </div>
      <img src="${starImg}" class="restaurant__like list__star"/>
    `;
  }

  setEvent() {
    this.$target
      .querySelector(".restaurant__info")
      .addEventListener("click", () => {
        this.handleDetailModal();
      });

    this.$target.querySelector(".list__star").addEventListener("click", () => {
      this.handleLike();
    });
  }
  handleLike() {
    this.props.like = !this.props.like;
    let storedData = getStoredRestaurantData();
    storedData = storedData.map((restaurant) =>
      restaurant.name === this.props.name
        ? { ...restaurant, like: this.props.like }
        : restaurant,
    );
    setStoredRestaurantData(storedData);
    const starImg = this.props.like ? "/filledStar.png" : "/unFilledStar.png";
    this.$target.querySelector(".list__star").src = starImg;
  }

  handleDetailModal() {
    const modalContainer = document.querySelector(".modal");
    modalContainer.classList.toggle("modal--open");
    new ModalDetail(modalContainer, {
      mode: "detail",
      data: this.props,
    });
  }
}

export default Restaurant;

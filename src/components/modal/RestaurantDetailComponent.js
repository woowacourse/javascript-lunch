import CustomElement from "../../abstracts/CustomElement";
import {
  CATEGORY_IMG,
  FAVORITE_IMG,
  RESTAURANT_ACTION,
} from "../../abstracts/constants";
import dispatcher from "../../domain/Dispatcher";

class RestaurantDetailComponent extends CustomElement {
  setEvent() {
    const modal = document.querySelector(".detail__name");
    if (modal)
      modal.querySelector(".star").addEventListener("click", (e) => {
        this.changeFavorite(e);
      });

    document.getElementById("close").addEventListener("click", this.hideModal);
    document.getElementById("delete").addEventListener("click", () => {
      this.deleteRestaurant();
    });
  }

  changeFavorite(e) {
    e.preventDefault();
    const favorite = this.getAttribute("favorite") === "0" ? "1" : "0";
    const listKey = this.getAttribute("listKey");
    this.setAttribute("favorite", favorite);

    this.querySelector(".star").src = FAVORITE_IMG[favorite];

    dispatcher(RESTAURANT_ACTION.UPDATE_FAVORITE, parseInt(listKey));
  }

  hideModal() {
    document.getElementById("detail_modal").classList.remove("modal--open");
    dispatcher(RESTAURANT_ACTION.UPDATE_MODAL_FAVORITE);
  }

  deleteRestaurant() {
    const listKey = this.getAttribute("listKey");

    document.getElementById("detail_modal").classList.remove("modal--open");
    dispatcher(RESTAURANT_ACTION.DELETE_RESTAURANT, parseInt(listKey));
  }

  template() {
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    const favorite = this.getAttribute("favorite");
    const link = this.getAttribute("link");

    return `
    <div class="detail__name">
      <div class="detail__background">
        <img
          src="${CATEGORY_IMG[category]}"             
          alt="${category}"
          class="detail__icon"
        />
      </div>
      <img src="${FAVORITE_IMG[favorite]}" alt="즐겨찾기" class="restaurant_star star" />
    </div>
    <div class="detail">
    <div class="detail__info">
      <h3 class="text-title">${name}</h3>
      <span class="detail__distance text-body">캠퍼스부터 ${distance}분 이내</span>
      <p class="detail__description text-body">
        ${description}
      </p>
      <a href="${link}" class="detail__link text-body"> ${link} </a>
      <div class="button-container">
        <button-element id="delete" btnType="button" btnClass="button--secondary" btnText="삭제하기"></button-element>
        <button-element id="close" btnType="button" btnClass="button--primary" btnText="닫기"></button-element>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define("restaurant-detail", RestaurantDetailComponent);

export default RestaurantDetailComponent;

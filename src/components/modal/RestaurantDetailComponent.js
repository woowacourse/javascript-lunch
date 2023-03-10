import CustomElement from "../../abstracts/CustomElement";
import { CATEGORY_IMG, FAVORITE_IMG } from "../../abstracts/constants";

class RestaurantDetailComponent extends CustomElement {
  setEvent() {
    document.getElementById("close").addEventListener("click", this.hideModal);
  }

  hideModal() {
    document.getElementById("detail_modal").classList.remove("modal--open");
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
        <button-element btnType="button" btnClass="button--secondary" btnText="삭제하기"></button-element>
        <button-element id="close" btnType="button" btnClass="button--primary" btnText="닫기"></button-element>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define("restaurant-detail", RestaurantDetailComponent);

export default RestaurantDetailComponent;

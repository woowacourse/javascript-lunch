import {
  CATEGORY_IMG,
  FAVORITE_IMG,
  RESTAURANT_ACTION,
} from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";

class RestaurantComponent extends CustomElement {
  setEvent() {
    const listKey = this.getAttribute("listKey");
    const findKey = document.getElementById(listKey);

    findKey.querySelector(".star").addEventListener("click", (e) => {
      this.changeFavorite(e);
    });

    findKey.querySelector(".restaurant__info").addEventListener("click", () => {
      this.showDetail();
    });
  }

  showDetail() {
    document.getElementById("detail_modal").classList.add("modal--open");
    const listKey = this.getAttribute("listKey");

    dispatcher(RESTAURANT_ACTION.SHOW_DETAIL, parseInt(listKey));
  }

  changeFavorite(e) {
    e.preventDefault();
    const favorite = this.getAttribute("favorite") === "0" ? "1" : "0";
    const listKey = this.getAttribute("listKey");
    this.setAttribute("favorite", favorite);

    this.querySelector(".star").src = FAVORITE_IMG[favorite];

    dispatcher(RESTAURANT_ACTION.UPDATE_FAVORITE, parseInt(listKey));
  }

  template() {
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    const listKey = this.getAttribute("listKey");
    const favorite = this.getAttribute("favorite");

    return `
    <li id="${listKey}" class="restaurant">
    <div class="restaurant__category">
        <img
            src="${CATEGORY_IMG[category]}"             
            alt=${category}
            class="category-icon"
        />
    </div>
    <div class="restaurant__info">
        <h3 class="text-subtitle restaurant__name">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
        <p class="restaurant__description text-body">
          ${description}
        </p>
    </div>
    <div>
      <img src="${FAVORITE_IMG[favorite]}" alt="즐겨찾기" class="restaurant_star star" />
    </div>
  </li>
        `;
  }
}

customElements.define("restaurant-element", RestaurantComponent);

export default RestaurantComponent;

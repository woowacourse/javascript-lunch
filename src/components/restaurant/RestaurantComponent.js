import { CATEGORY_IMG } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";

class RestaurantComponent extends CustomElement {
  setEvent() {
    document.querySelector(".star").addEventListener("click", (e) => {
      this.changeFavorite(e);
    });
  }
  changeFavorite(e) {
    e.preventDefault();
    const favorite = this.getAttribute("favorite") === "0" ? "1" : "0";
    this.setAttribute("favorite", favorite);

    const a = this.getAttribute("favorite");
    console.log(a);

    document.querySelector(".star").src =
      favorite === "0"
        ? "./favorite-icon-lined.png"
        : "./favorite-icon-filled.png";
  }

  template() {
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    return `
    <li class="restaurant">
    <div class="restaurant__category">
        <img
            src="${CATEGORY_IMG[category]}"             
            alt=${category}
            class="category-icon"
        />
    </div>
    <div class="restaurant__info">
        <div class="restaurant__name">
        <h3 class="text-subtitle">${name}</h3>
        <img src="./favorite-icon-lined.png" alt="즐겨찾기" class="restaurant_star star" />
        </div>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
        <p class="restaurant__description text-body">
          ${description}
        </p>
    </div>
  </li>
        `;
  }
}

customElements.define("restaurant-element", RestaurantComponent);

export default RestaurantComponent;

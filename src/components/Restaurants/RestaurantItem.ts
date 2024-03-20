import BaseComponent from "../BaseComponent";

class RestaurantItem extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const category = this.getAttribute("category") ?? "";
    const name = this.getAttribute("name") ?? "";
    const distance = this.getAttribute("distance") ?? "";
    const description = this.getAttribute("description") ?? "";
    const isFavorite = this.getAttribute("is-favorite") ?? "";

    this.innerHTML = /*html*/ `
      <div class="restaurant">
        <category-image category="${category}"></category-image>
        <div class="restaurant__info__layout">
          <div class="restaurant__info">
            <span class="restaurant__name text-subtitle">${name}</span>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            ${description ? `<p class="restaurant__description text-body">${description}</p>` : ""}
          </div>
          <favorite-icon is-favorite="${isFavorite}" restaurant-name="${name}"></favorite-icon>
        </div>
      </div>
      `;
  }
}

customElements.define("restaurant-item", RestaurantItem);

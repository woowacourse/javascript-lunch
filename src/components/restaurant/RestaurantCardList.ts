import type { Restaurant } from "../../types/restaurant";

export class RestaurantCardList extends HTMLUListElement {
  constructor() {
    super();
  }

  render(restaurants: Restaurant[]) {
    this.innerHTML = `
      ${restaurants
        .map(
          (restaurant) =>
            `<li 
              id="${restaurant.id}"
              is="restaurant-card" 
              class="restaurant" 
              category="${restaurant.category}" 
              name="${restaurant.name}" 
              distance="${restaurant.distance}" 
              description="${restaurant.description}"
              like="${restaurant.like}" 
              link="${restaurant.link}" 
            ></li>`
        )
        .join("")}
    `;
  }

  bindEvent(
    handleClickLikeIcon: (restaurantName: string) => void,
    handleClickCard: (restaurantName: string) => void
  ) {
    this.addEventListener("click", (event: MouseEvent) => {
      const restaurantId =
        (event.target as HTMLElement).closest("li")?.getAttribute("id") ?? "";

      if ((event.target as HTMLElement).className === "like-icon") {
        handleClickLikeIcon(restaurantId);
        return;
      }

      handleClickCard(restaurantId);
    });
  }
}

export const createRestaurantCardList = () => {
  customElements.define("restaurant-card-list", RestaurantCardList, {
    extends: "ul",
  });
};

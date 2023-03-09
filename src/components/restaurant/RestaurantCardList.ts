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
              is="restaurant-card" 
              class="restaurant" 
              category="${restaurant.category}" 
              name="${restaurant.name}" 
              distance="${restaurant.distance}" 
              description="${restaurant.description}"
              like="${restaurant.like}"
            ></li>`
        )
        .join("")}
    `;
  }

  bindEvent(handleClickLikeIcon: (restaurantName: string) => void) {
    this.addEventListener("click", (event: MouseEvent) => {
      if ((event.target as HTMLElement).className === "like-icon") {
        handleClickLikeIcon(
          (event.target as HTMLElement).getAttribute("name") as string
        );
      }
    });
  }
}

export const createRestaurantCardList = () => {
  customElements.define("restaurant-card-list", RestaurantCardList, {
    extends: "ul",
  });
};

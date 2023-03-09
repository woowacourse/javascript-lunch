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
              like="${restaurant.link}" 
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
      const restaurantName = (event.target as HTMLElement)
        .closest("li")
        ?.getAttribute("name") as string;

      if ((event.target as HTMLElement).className === "like-icon") {
        handleClickLikeIcon(restaurantName);
        return;
      }

      handleClickCard(restaurantName);
    });
  }
}

export const createRestaurantCardList = () => {
  customElements.define("restaurant-card-list", RestaurantCardList, {
    extends: "ul",
  });
};

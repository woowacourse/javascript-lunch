import { RestaurantData } from "../../domain/RestaurantData";
import { RestaurantType } from "../../Template";
import { $ } from "../../until/ControlDom";
import { Restaurant } from "./Restaurant";

export const RestaurantList = {
  template(restaurantList: RestaurantType[]): string {
    return `<ul class='restaurant-list'>
        ${restaurantList
          .map((restaurant) => Restaurant.template(restaurant))
          .join("")}
        </ul>`;
  },

  setEvent() {
    const restaurantListContainer = $(".restaurant-list-container");
    restaurantListContainer?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const targetId = target?.closest("li")?.id;

      if (!targetId) return;
      //click star

      if (target.className === "likeImg") {
        RestaurantData.turnLikeUnlike(+targetId!);

        const restaurantListContainer = $(
          ".restaurant-list-container"
        ) as HTMLElement;

        const showSection =
          restaurantListContainer.classList.length === 1
            ? RestaurantData.allList
            : RestaurantData.likeList;

        this.renderRestaurantList(showSection);

        console.log(RestaurantData.likeList);
      }
      //click restaurant
    });
  },

  renderRestaurantList(restaurantList: RestaurantType[]): void {
    const restaurantListContainer = $(
      ".restaurant-list-container"
    ) as HTMLDataListElement;
    restaurantListContainer.innerHTML = RestaurantList.template(restaurantList);
  },
};

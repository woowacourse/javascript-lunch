import { RestaurantService } from "../../domain/RestaurantService";
import { RestaurantType } from "../../Template";
import { $, Render } from "../../until/ControlDom";
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
        RestaurantService.turnLikeUnlike(+targetId!);

        const restaurantListContainer = $(
          ".restaurant-list-container"
        ) as HTMLElement;

        const showSection =
          restaurantListContainer.classList.length === 1
            ? RestaurantService.allList
            : RestaurantService.likeList;

        Render.restaurantList(showSection);

        console.log(RestaurantService.likeList);
      }
      //click restaurant
    });
  },
};

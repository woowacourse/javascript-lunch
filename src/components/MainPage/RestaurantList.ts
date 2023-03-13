import { RenderRestaurantList } from "../../domain/RenderRestaurantList";
import { RestaurantData } from "../../domain/RestaurantData";
import { RestaurantType } from "../../Template";
import { $ } from "../../until/ControlDom";
import { InfoPage } from "../RestaurantInfoSheet/InfoPage";
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
      const targetLi = target?.closest("li") as HTMLElement;

      if (!targetLi.id) return;

      if (target.className === "likeImg") {
        this.turnLikeUnlikeRestaurant(+targetLi.id);
        return;
      }
      InfoPage.showBottomSheet(+targetLi.id);
    });
  },

  turnLikeUnlikeRestaurant(targetId: number) {
    RestaurantData.turnLikeUnlike(targetId);
    RenderRestaurantList.render();
  },
};

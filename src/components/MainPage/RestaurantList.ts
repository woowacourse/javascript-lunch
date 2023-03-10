import { FilterSort } from "../../domain/FilterSort";
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
      const targetId = target?.closest("li")?.id;

      // 잘못된 영역 클릭 시 방지
      if (!targetId) return;

      if (target.className === "likeImg") {
        this.clickStarImg(+targetId!);
        return;
      }
      InfoPage.showBottomSheet(+targetId!);
    });
  },

  renderRestaurantList() {
    const restaurantListContainer = $(
      ".restaurant-list-container"
    ) as HTMLDataListElement;
    restaurantListContainer.innerHTML = this.getRestaurantForShow(
      this.nowListSection()
    );
  },

  nowListSection() {
    const restaurantListContainer = $(
      ".restaurant-list-container"
    ) as HTMLElement;

    return restaurantListContainer.classList.length === 1
      ? "allList"
      : "likeList";
  },

  getRestaurantForShow(listSection: string) {
    if (listSection === "allList") {
      return RestaurantList.template(
        FilterSort.getNewList(RestaurantData.allList)
      );
    }
    return RestaurantList.template(RestaurantData.likeList);
  },

  clickStarImg(targetId: number) {
    RestaurantData.turnLikeUnlike(targetId);
    this.renderRestaurantList();
  },
};

import IMAGE from "../IMAGE";
import { $ } from "../util/querySelector";

const RestaurantInfo = {
  createSummaryElement(restaurant) {
    const summaryTemplate = $("#list-template");
    const summaryClone = document.importNode(summaryTemplate.content, true);

    summaryClone.querySelector(".restaurant__name").textContent = restaurant.name;
    summaryClone.querySelector(".restaurant__distance").textContent = `${restaurant.estimatedTime}분 내`;
    summaryClone.querySelector(".restaurant__description").textContent = restaurant.description;
    summaryClone.querySelector(".category-icon").src = IMAGE[restaurant.category];

    return summaryClone;
  },
};

export default RestaurantInfo;

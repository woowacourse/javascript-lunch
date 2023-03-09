import IMAGE from "../../IMAGE";
import { $ } from "../../util/querySelector";

const createBasicElementFromTemplate = (selectors, restaurant) => {
  const template = $(selectors);
  const clone = document.importNode(template.content, true);

  clone.querySelector(".restaurant__name").textContent = restaurant.name;
  clone.querySelector(".restaurant__distance").textContent = `${restaurant.estimatedTime}분 내`;
  clone.querySelector(".restaurant__description").textContent = restaurant.description;
  clone.querySelector(".category-icon").src = IMAGE[restaurant.category];

  return clone;
};

const RestaurantInfo = {
  createSummaryElement(restaurant) {
    return createBasicElementFromTemplate("#list-template", restaurant);
  },

  createDetailedElement(restaurant) {
    const detailedClone = createBasicElementFromTemplate("#detailed-info-template", restaurant);
    detailedClone.querySelector(".restaurant__link").href = restaurant.link;
    detailedClone.querySelector(".restaurant__link").textContent = restaurant.link;

    return detailedClone;
  },
};

export default RestaurantInfo;

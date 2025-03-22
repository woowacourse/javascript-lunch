import createElement from "../../../util/createElement";
import RestaurantDetailModalButtonContainer from "./RestaurantDetailModalButtonContainer.js";
import RestaurantDetailModalInfo from "./RestaurantDetailModalInfo.js";

export default function RestaurantDetailModal(restaurantData) {
  const $section = createElement({
    tag: "section",
    classNames: ["restaurantDetail__modal"],
  });

  const $detailInfo = RestaurantDetailModalInfo({ ...restaurantData });
  const $buttons = RestaurantDetailModalButtonContainer(restaurantData.id);

  $section.appendChild($detailInfo);
  $section.appendChild($buttons);

  return $section;
}

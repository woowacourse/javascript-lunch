import createElement from "../utils/createElement/createElement";
import { $ } from "../utils/dom";

const renderFavoritePage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  $(".restaurant-list").appendChild(
    createElement({
      tagName: "p",
      classNames: ["empty-list"],
      text: "자주 가는 음식점이 없습니다.",
    })
  );
};

export default renderFavoritePage;

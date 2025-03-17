import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import RestaurantCard from "../restaurantCard";

const RestaurantList = (restaurants) => {
  const ulTag = $(".restaurant-list");
  ulTag.replaceChildren();

  if (restaurants.length === 0) {
    ulTag.appendChild(
      createElement(`<div>등록된 식당이 존재하지 않습니다.</div>`)
    );
    return;
  }
  // TODO 위치 변경?
  // this.#setToLocalStorage();
  restaurants.forEach((restaurant) => {
    ulTag.appendChild(RestaurantCard(restaurant));
  });
};

export default RestaurantList;

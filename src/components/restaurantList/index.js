import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import RestaurantCard from "../restaurantCard";

const RestaurantList = (restaurants, filter) => {
  // restaurants, filter 모두 인스턴스
  const ulTag = $(".restaurant-list");
  ulTag.replaceChildren();

  const filteredRestaurants = filter.filter(restaurants.restaurants);

  if (filteredRestaurants.length === 0) {
    ulTag.appendChild(
      createElement(`<div>등록된 식당이 존재하지 않습니다.</div>`)
    );
    return;
  }
  filteredRestaurants.forEach((restaurantData) => {
    ulTag.appendChild(RestaurantCard(restaurantData, restaurants, filter));
  });
};

export default RestaurantList;

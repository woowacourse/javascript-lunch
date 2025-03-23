import { Filter } from "../../domain/filter";
import Restaurants from "../../model/Restaurants";
import { createElement } from "../../utils/createElement";
import { $ } from "../../utils/dom";
import RestaurantCard from "../restaurantCard";

const RestaurantList = (restaurantListData, restaurants) => {
  const ulTag = $(".restaurant-list");
  ulTag.replaceChildren();

  if (restaurantListData.length === 0) {
    ulTag.appendChild(
      createElement(`<div>등록된 식당이 존재하지 않습니다.</div>`)
    );
    return;
  }

  restaurantListData.forEach((restaurantData) => {
    ulTag.appendChild(RestaurantCard(restaurantData, restaurants));
  });
};

export default RestaurantList;

import { Restaurant } from "../../types/RestaurantType";
import { $ } from "../utils/querySelectors";
import LunchInfoCard from "./LunchInfoCard";

function RestaurantListContainer(items: Restaurant[]) {
  const el = $(".restaurant-list");
  el.innerHTML = items.map(LunchInfoCard).join("");
}

export default RestaurantListContainer;

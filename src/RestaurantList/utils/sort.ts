import { $ } from "../../util/querySelector";
import RestaurantList from "../RestaurantList";
import RestaurantSummary from "../../RestaurantSummary/RestaurantSummary";

const sortByName = (list: RestaurantSummary[]) => {
  return list.sort((a, b) => {
    if (a.info.restaurant.name <= b.info.restaurant.name) return -1;
    return 1;
  });
};

const sortByDistance = (list: RestaurantSummary[]) => {
  return list.sort((a, b) => {
    if (Number(a.info.restaurant.estimatedTime) <= Number(b.info.restaurant.estimatedTime)) return -1;
    return 1;
  });
};

export const sort = (list: RestaurantSummary[]) => {
  const attribute = ($("#sorting-filter") as HTMLSelectElement).value;
  if (attribute === "name") return sortByName(list);
  if (attribute === "distance") return sortByDistance(list);
  return [];
};

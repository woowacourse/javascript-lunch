import RestaurantList from "../components/RestaurantList";
import { Restaurant } from "../type/restaurant";

const sortByName = (list: Restaurant[]) => {
  return list?.sort((a, b) => {
    if (a.name <= b.name) return -1;
    return 1;
  });
};

const sortByDistance = (list: Restaurant[]) => {
  return list.sort((a, b) => {
    if (Number(a.distance) <= Number(b.distance)) return -1;
    return 1;
  });
};

export const sortRestaurant = (attribute: string, list: Restaurant[]) => {
  if (attribute === "name") return sortByName(list);
  if (attribute === "distance") return sortByDistance(list);
};

const sortNodeByName = (list: RestaurantList[]) => {
  return list?.sort((a: RestaurantList, b: RestaurantList) => {
    if (a.element.name <= b.element.name) return -1;
    return 1;
  });
};

const sortNodeByDistance = (list: RestaurantList[]) => {
  return list.sort((a: RestaurantList, b: RestaurantList) => {
    if (Number(a.element.distance) <= Number(b.element.distance)) return -1;
    return 1;
  });
};

export const sortRestaurantNode = (
  attribute: string,
  list: RestaurantList[]
) => {
  if (attribute === "name") return sortNodeByName(list);
  if (attribute === "distance") return sortNodeByDistance(list);
};

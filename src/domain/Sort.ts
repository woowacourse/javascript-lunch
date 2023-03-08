import Restaurant from "../type/restaurant";
import PersonalRestaurant from "../type/PersonalRestaurant";

const sortByName = (list: PersonalRestaurant[]) => {
  return list.sort((a, b) => {
    if (a.restaurant.name <= b.restaurant.name) return -1;
    return 1;
  });
};

const sortByDistance = (list: PersonalRestaurant[]) => {
  return list.sort((a, b) => {
    if (Number(a.restaurant.estimatedTime) <= Number(b.restaurant.estimatedTime)) return -1;
    return 1;
  });
};

export const sort = (attribute: string, list: PersonalRestaurant[]) => {
  if (attribute === "name") return sortByName(list);
  if (attribute === "distance") return sortByDistance(list);
};

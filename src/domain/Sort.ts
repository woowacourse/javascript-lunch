import { Restaurant } from "../type/restaurant";

const sortByName = (list: Restaurant[]) => {
  return list.sort((a, b) => {
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

export const sort = (attribute: string, list: Restaurant[]) => {
  if (attribute === "name") return sortByName(list);
  if (attribute === "distance") return sortByDistance(list);
};

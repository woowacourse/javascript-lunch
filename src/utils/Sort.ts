import { RestaurantForm } from "../global/types";

export const sortByName = (restaurant: RestaurantForm[]) => {
  return restaurant.sort((prev: RestaurantForm, next: RestaurantForm) => {
    if (prev.name > next.name) return 1;
    if (prev.name < next.name) return -1;
    return 0;
  });
};

export const sortByDistance = (restaurant: RestaurantForm[]) => {
  return restaurant.sort(
    (prev: RestaurantForm, next: RestaurantForm) =>
      prev.distance - next.distance
  );
};

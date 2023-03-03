import { SELECTED_OPTION } from "../constant";
import { RestaurantType } from "../type";
import { renderRestaurantList } from "../ui/restaurantListRenderer";
import { getAllDataOnLocalStorage } from "../util/localStorage";

export const sortByName = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

export const sortByDistance = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => Number(a.distance) - Number(b.distance));
};

export const filterCategory = (selectedCategory: string) => {
  const restaurantList = getAllDataOnLocalStorage();
  if (selectedCategory === SELECTED_OPTION.All_CATEGORIES)
    return renderRestaurantList(restaurantList);

  const filteredList = restaurantList.filter(
    (restaurant) => restaurant.category === selectedCategory
  );

  renderRestaurantList(filteredList);
};

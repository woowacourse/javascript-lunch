import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "../constant";
import { RestaurantType } from "../type";
import { renderRestaurantList } from "../component/restaurantList";
import { getAllRestaurantsInLocalStorage } from "./localStorageController";
import { controlRestaurants } from "./RestaurantsController";
const { All_CATEGORIES, NAME, DISTANCE } = SELECTED_OPTION;
const { CATEGORY, SORT } = LOCAL_STORAGE_KEY;

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
  const restaurantList = getAllRestaurantsInLocalStorage();
  if (selectedCategory === All_CATEGORIES) return restaurantList;

  return restaurantList.filter(
    (restaurant) => restaurant.category === selectedCategory
  );
};

export const sortRestaurantList = (
  selectedSort: string,
  filteredRestaurantList: RestaurantType[]
) => {
  if (selectedSort === NAME) {
    return renderRestaurantList(sortByName(filteredRestaurantList));
  }

  if (selectedSort === DISTANCE) {
    return renderRestaurantList(sortByDistance(filteredRestaurantList));
  }
};

export const updateRestaurantList = () => {
  const filteredRestaurantList = filterCategory(
    localStorage.getItem(CATEGORY) as string
  );

  sortRestaurantList(
    localStorage.getItem(SORT) as string,
    filteredRestaurantList
  );

  controlRestaurants();
};

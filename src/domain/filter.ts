import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "../constant";
import { CategoryOptionType, RestaurantType, SortType } from "../type";
import { renderRestaurants } from "../component/restaurants";
import { getAllRestaurantsInLocalStorage } from "./localStorageController";
import { $ } from "../util/selector";
const { All_CATEGORIES, NAME, DISTANCE } = SELECTED_OPTION;
const { CATEGORY, SORT } = LOCAL_STORAGE_KEY;

const sortByName = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

const sortByDistance = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => Number(a.distance) - Number(b.distance));
};

const filterCategory = (selectedCategory: CategoryOptionType) => {
  const restaurantList = $("#tab-button2")?.classList.contains("active")
    ? filterFavoriteRestaurant()
    : getAllRestaurantsInLocalStorage();

  if (selectedCategory === All_CATEGORIES) return restaurantList;

  return restaurantList.filter(
    (restaurant) => restaurant.category === selectedCategory
  );
};

const filterFavoriteRestaurant = () => {
  const restaurantList = getAllRestaurantsInLocalStorage();
  return restaurantList.filter(
    (restaurant) => restaurant.favorite === "favorite"
  );
};

const sortRestaurantList = (
  selectedSort: SortType,
  filteredRestaurantList: RestaurantType[]
) => {
  if (selectedSort === NAME) {
    return renderRestaurants(sortByName(filteredRestaurantList));
  }

  if (selectedSort === DISTANCE) {
    return renderRestaurants(sortByDistance(filteredRestaurantList));
  }
};

export const updateRestaurants = () => {
  const filteredRestaurantList = filterCategory(
    localStorage.getItem(CATEGORY) as CategoryOptionType
  );

  sortRestaurantList(
    localStorage.getItem(SORT) as SortType,
    filteredRestaurantList
  );
};

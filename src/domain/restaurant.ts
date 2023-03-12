import Validator from "../tools/Validator";
import IRestaurant from "../type/IRestaurant";
import { TCategory } from "../type/TCategory";
import { closeBottomSheet } from "../components/BottomSheet/handleBottomSheet";
import { CATEGORY_NAME } from "../constants/CATEGORY_NAME";
import { DISTANCE } from "../constants/DISTANCE";
import { v4 as uuidv4 } from "uuid";
import { restaurants } from "./restaurants";
import Storage from "../tools/Storage";
import defaultRestaurants from "../tools/defaultRestaurants";

export const findRestaurantById = (id: string) => {
  return restaurants.state.restaurants.find((r) => r.id === id);
};

export const categoryOptions = () => {
  return Object.entries(CATEGORY_NAME)
    .map((value) => `<option value="${value[0]}">${value[1]}</option>`)
    .join("");
};

export const distanceOptions = () => {
  return Object.values(DISTANCE)
    .map((value) => `<option value="${value}">${value}분 내</option>`)
    .join("");
};

export const createNewRestaurant = (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const newRestaurant: IRestaurant = {
    id: uuidv4(),
    category: formData.get("category") as TCategory,
    name: formData.get("name") as string,
    distance: Number(formData.get("distance")),
    description: formData.get("description") as string,
    link: formData.get("link") as string,
    favorite: false,
  };
  return newRestaurant;
};

export const tryAddNewRestaurant = (newRestaurant: IRestaurant) => {
  try {
    Validator.checkRestaurant(newRestaurant);
    addRestaurant(newRestaurant);
    closeBottomSheet();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

export const selectRestaurants = (): IRestaurant[] => {
  const { filter, sort, menuTab } = restaurants.state;
  const filteredRestaurants = filterRestaurants(
    restaurants.state.restaurants,
    filter,
    menuTab
  );
  return sortRestaurants(filteredRestaurants, sort);
};

export const filterRestaurants = (
  restaurants: IRestaurant[],
  filter: string,
  menuTab: string
) => {
  const filteredRestaurantList =
    menuTab === "tab-all"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.favorite);
  return filter === "all"
    ? filteredRestaurantList
    : filteredRestaurantList.filter(
        (restaurant) => restaurant.category === filter
      );
};

export const sortRestaurants = (restaurants: IRestaurant[], sort: string) => {
  return restaurants.sort((a, b) => {
    if (sort === "name" || sort === "distance") {
      return a[sort] > b[sort] ? 1 : -1;
    }
    return 0;
  });
};

export const updateRestaurants = (newRestaurants: IRestaurant[]) => {
  restaurants.state.restaurants = [...newRestaurants];
  Storage.saveRestaurants(restaurants.state.restaurants);
};

export const updateFavorite = (id: string) => {
  const copiedRestaurants = [...restaurants.state.restaurants];
  const index = copiedRestaurants.findIndex((r) => r.id === id);
  const originalFovrite = copiedRestaurants[index].favorite;
  copiedRestaurants[index].favorite = !originalFovrite;
  updateRestaurants(copiedRestaurants);
};

export const restoreRestaurants = () => {
  const restoredRestaurants = Storage.loadRestaurants();
  updateRestaurants(
    restoredRestaurants.length > 0 ? restoredRestaurants : defaultRestaurants
  );
};

export const addRestaurant = (newRestaurant: IRestaurant) => {
  updateRestaurants([...restaurants.state.restaurants, newRestaurant]);
};

export const deleteRestaurant = (id: string) => {
  updateRestaurants(restaurants.state.restaurants.filter((r) => r.id !== id));
  closeBottomSheet();
};

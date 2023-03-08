import Validator from "../tools/Validator";
import IRestaurant from "../type/IRestaurant";
import { TCategory } from "../type/TCategory";
import { closeBottomSheet } from "../components/BottomSheet/handleBottomSheet";
import { addRestaurant } from "../components/RestaurantList/handleRestaurantList";
import { CATEGORY_NAME } from "../constants/CATEGORY_NAME";
import { DISTANCE } from "../constants/DISTANCE";
import { v4 as uuidv4 } from "uuid";

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

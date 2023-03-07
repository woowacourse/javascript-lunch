import Validator from "../tools/Validator";
import IRestaurant from "../type/IRestaurant";
import { TCategory } from "../type/TCategory";
import { closeBottomSheet } from "../components/BottomSheet/handleBottomSheet";
import { addRestaurant } from "../components/RestaurantList/handleRestaurantList";

export const createNewRestaurant = (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const newRestaurant: IRestaurant = {
    category: formData.get("category") as TCategory,
    name: formData.get("name") as string,
    distance: Number(formData.get("distance")),
    description: formData.get("description") as string,
    link: formData.get("link") as string,
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
  filter: string
) => {
  return filter === "all"
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.category === filter);
};

export const sortRestaurants = (restaurants: IRestaurant[], sort: string) => {
  return restaurants.sort((a, b) => {
    if (sort === "name" || sort === "distance") {
      return a[sort] > b[sort] ? 1 : -1;
    }
    return 0;
  });
};

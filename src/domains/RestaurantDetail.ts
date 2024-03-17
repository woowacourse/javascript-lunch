import { getRestaurantFromStorage } from "./Restaurants";

export const getRestaurantDetail = (name: string) => {
  const storedRestaurants = getRestaurantFromStorage();
  const restaurant = storedRestaurants.find(
    (restaurant) => restaurant.name === name
  );
  return restaurant;
};

export const deleteRestaurant = (name: string) => {
  const storedRestaurants = getRestaurantFromStorage();
  const updatedRestaurants = storedRestaurants.filter(
    (restaurant) => restaurant.name !== name
  );
  localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
};

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

export const favoriteToggle = (name: string) => {
  const storedRestaurants = getRestaurantFromStorage();
  const updatedRestaurants = storedRestaurants.map((restaurant) => {
    if (restaurant.name === name) {
      return { ...restaurant, isFavorite: !restaurant.isFavorite };
    }
    return restaurant;
  });
  localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
};

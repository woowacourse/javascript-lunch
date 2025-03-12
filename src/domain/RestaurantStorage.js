export function AddNewRestaurant({ restaurant }) {
  if (!GetAllRestaurants()) {
    localStorage.setItem("restaurants", JSON.stringify([restaurant]));
    return;
  }
  const restaurants = GetAllRestaurants();
  restaurants.push(restaurant);
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

export function GetAllRestaurants() {
  return JSON.parse(localStorage.getItem("restaurants")) || [];
}

export function SaveFavoriteRestaurantInStorage(favoriteRestaurant) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant) => {
    if (restaurant.nameValue === favoriteRestaurant.nameValue) {
      restaurant.favorite = favoriteRestaurant.favorite;
    }
  });

  localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
}

export function DeleteFavoriteRestaurantInStorage(restaurantName) {
  const allRestaurants = GetAllRestaurants();
  allRestaurants.forEach((restaurant) => {
    if (restaurant.nameValue === restaurantName) {
      restaurant.favorite = false;
    }
  });

  localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
}

export function DeleteRestaurant(restaurantName) {
  const allRestaurants = GetAllRestaurants();

  const filteredRestaurants = allRestaurants.filter(
    (restaurant) => restaurant.nameValue !== restaurantName
  );

  localStorage.setItem("restaurants", JSON.stringify(filteredRestaurants));
}

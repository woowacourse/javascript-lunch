export function getRestaurantListFromLocalstorage() {
  return JSON.parse(localStorage.getItem("restaurants"));
}

export function stringifyJson(restaurant) {
  return JSON.stringify(restaurant);
}

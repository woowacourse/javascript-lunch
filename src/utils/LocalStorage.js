export function getRestaurantListFromLocalstorage(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function stringifyJson(value) {
  return JSON.stringify(value);
}

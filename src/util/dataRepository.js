const DATA_KEY = "restaurantData";

export function getAllData() {
  return JSON.parse(localStorage.getItem(DATA_KEY));
}

const DATA_KEY = "restaurantData";

export function getAllData() {
  return JSON.parse(localStorage.getItem(DATA_KEY));
}

export function postData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

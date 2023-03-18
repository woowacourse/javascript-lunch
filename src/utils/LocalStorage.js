export const getValueFromLocalStorage = (value, defaultValue) => {
  return localStorage.getItem(value) ?? defaultValue;
};

export function getRestaurantListFromLocalstorage(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function stringifyJson(value) {
  return JSON.stringify(value);
}

export function setToLocalStorage(key, restaurants) {
  localStorage.setItem(key, stringifyJson(restaurants));
}

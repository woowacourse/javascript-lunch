export function getRestaurantListFromLocalstorage(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function stringifyJson(value) {
  return JSON.stringify(value);
}

export function getFoodCategoryFromLocalStorage(){
  return localStorage.getItem("foodCategory") ?? "전체";
}

export function getSortByFromLocalStorage(){
  return localStorage.getItem("sort") ?? "name";
}
    
export function setToLocalStorage(key, restaurants){
  localStorage.setItem(key,stringifyJson(restaurants));
}
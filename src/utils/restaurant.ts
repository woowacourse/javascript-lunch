import { STORAGE_KEY } from "../settings/settings";
import type { CategoryFilter, Restaurant, SortedOption } from "../types/type";
import { getStorage, setStorage } from "./storage";

export function getRestaurantList(): Restaurant[] {
  return getStorage(STORAGE_KEY.RESTAURANTS) ?? [];
}

export function getRestaurantItem(id: string): Restaurant {
  const restaurantList = getRestaurantList();
  const result = restaurantList.find((restaurant) => restaurant.id === id);

  if (!result) {
    throw new Error("해당 ID를 가진 음식점이 없습니다.");
  }

  return result;
}

export function removeRestaurantItem(id: string): Restaurant[] {
  const restaurantList = getRestaurantList();
  const newList = restaurantList.filter((restaurant) => restaurant.id !== id);
  setStorage(STORAGE_KEY.RESTAURANTS, newList);
  return newList;
}

export function sortRestaurantList(
  restaurantList: Restaurant[],
  sortedOption: SortedOption
): Restaurant[] {
  return restaurantList.sort((a, b) => {
    if (sortedOption === "name") {
      return a[sortedOption].localeCompare(b[sortedOption]);
    }

    return a[sortedOption] - b[sortedOption];
  });
}

export function filterRestaurantList(
  restaurantList: Restaurant[],
  categoryFilter: CategoryFilter
): Restaurant[] {
  if (categoryFilter === "전체") {
    return restaurantList;
  }

  return restaurantList.filter(({ category }) => category === categoryFilter);
}

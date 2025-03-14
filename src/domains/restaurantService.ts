import RULES from "../constants/rules.js";
import { Restaurant } from "./restaurants.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function addRestaurant(
  restaurants: Restaurant[],
  newRestaurant: Restaurant
): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRestaurant),
    });

    if (!response.ok) {
      throw new Error("Failed to add restaurant");
    }

    const createdRestaurant = await response.json();
    return [...restaurants, createdRestaurant];
  } catch (error) {
    alert("음식점을 추가하지 못했습니다. 다시 시도해주세요.");
    return restaurants;
  }
}

export async function deleteRestaurant(
  restaurants: Restaurant[],
  restaurantId: string
): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete restaurant");
    }

    return restaurants.filter((restaurant) => restaurant.id !== restaurantId);
  } catch (error) {
    alert("음식점을 삭제하지 못했습니다. 다시 시도해주세요.");
    return restaurants;
  }
}

export async function toggleFavorite(
  restaurants: Restaurant[],
  restaurantId: string
): Promise<Restaurant[]> {
  const target = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
  if (!target) return restaurants;

  const updatedRestaurant = { ...target, isFavorite: !target.isFavorite };

  try {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRestaurant),
    });

    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }

    return restaurants.map((restaurant) =>
      restaurant.id === restaurantId ? updatedRestaurant : restaurant
    );
  } catch (error) {
    alert("즐겨찾기를 업데이트하지 못했습니다. 다시 시도해주세요.");
    return restaurants;
  }
}

export function filterAndSortRestaurants(
  restaurants: Restaurant[],
  category: string,
  sorting: string
): Restaurant[] {
  let filteredRestaurants = [...restaurants];

  if (category !== RULES.ALL_CATEGORY) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.category === category
    );
  }

  if (sorting === RULES.SORTING[1]) {
    filteredRestaurants.sort((a, b) => {
      const diff = a.distance - b.distance;
      return diff !== 0 ? diff : a.name.localeCompare(b.name, "ko");
    });
    return filteredRestaurants;
  }

  filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  return filteredRestaurants;
}

export function getFavoriteRestaurants(
  restaurants: Restaurant[]
): Restaurant[] {
  return restaurants.filter((restaurant) => restaurant.isFavorite);
}

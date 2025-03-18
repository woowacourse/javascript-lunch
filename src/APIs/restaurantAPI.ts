import { Restaurant } from "../domains/restaurant.ts";
import { apiRequest } from "./APIRequest.ts";

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const data = await apiRequest<Restaurant[]>("/restaurants", {
      method: "GET",
    });
    return data;
  } catch (error) {
    alert("데이터를 불러오지 못했습니다. 다시 시도해주세요.");
    return [];
  }
}

export async function addRestaurant(
  restaurants: Restaurant[],
  newRestaurant: Restaurant
): Promise<Restaurant[]> {
  try {
    const createdRestaurant = await apiRequest<Restaurant>("/restaurants", {
      method: "POST",
      body: JSON.stringify(newRestaurant),
    });
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
    await apiRequest<void>(`/restaurants/${restaurantId}`, {
      method: "DELETE",
    });
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
    await apiRequest<Restaurant>(`/restaurants/${restaurantId}`, {
      method: "PUT",
      body: JSON.stringify(updatedRestaurant),
    });
    return restaurants.map((restaurant) =>
      restaurant.id === restaurantId ? updatedRestaurant : restaurant
    );
  } catch (error) {
    alert("즐겨찾기를 업데이트하지 못했습니다. 다시 시도해주세요.");
    return restaurants;
  }
}

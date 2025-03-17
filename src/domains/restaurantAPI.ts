import { Restaurant } from "./restaurant.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/restaurants`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: Restaurant[] = await response.json();
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

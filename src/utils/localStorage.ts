import { Restaurant } from "../../types/Restaurant.ts";

const STORAGE_KEY = "restaurants";

export function loadRestaurants(): Restaurant[] | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;
    
    return JSON.parse(storedData) as Restaurant[];
  } catch (error) {
    console.error("localStorage에서 데이터 로드 중 오류 발생:", error);
    return null;
  }
}

export function saveRestaurants(restaurants: Restaurant[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
    return true;
  } catch (error) {
    console.error("localStorage에 데이터 저장 중 오류 발생:", error);
    return false;
  }
}
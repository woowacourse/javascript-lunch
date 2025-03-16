import { Restaurant } from "../../types/Restaurant.ts";

type StorageKey = "restaurants";

const STORAGE_KEYS: Record<string,StorageKey> = {
  RESTAURANTS: "restaurants",
};

export function getStoredRestaurants():Restaurant[] | null{
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("레스토랑 데이터를 불러오는데 실패했습니다:", error);
    return null;
  }
}

// localStorage에 레스토랑 데이터 저장하기
export function storeRestaurants(restaurants: Restaurant[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants));
  } catch (error) {
    console.error("레스토랑 데이터를 저장하는데 실패했습니다:", error);
  }
}

// localStorage 초기화하기
export function clearLocalStorage():void {
  try {
    // 특정 데이터만 삭제
    localStorage.removeItem(STORAGE_KEYS.RESTAURANTS);
    console.log("localStorage가 초기화되었습니다.");

    // 페이지 새로고침
    window.location.reload();
  } catch (error) {
    console.error("localStorage 초기화에 실패했습니다:", error);
  }
}

declare global {
  interface Window {
    clearLocalStorage: () => void;
  }
}
window.clearLocalStorage = clearLocalStorage;

// localStorage에서 레스토랑 데이터 초기화하기
export function initializeRestaurants(initialData:Restaurant[]):Restaurant[] {
  const storedRestaurants = getStoredRestaurants();

  if (!storedRestaurants) {
    storeRestaurants(initialData);
    return initialData;
  }

  return storedRestaurants;
}

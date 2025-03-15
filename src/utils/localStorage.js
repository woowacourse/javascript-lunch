const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
};

// localStorage에서 레스토랑 데이터 가져오기
export function getStoredRestaurants() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("레스토랑 데이터를 불러오는데 실패했습니다:", error);
    return null;
  }
}

// localStorage에 레스토랑 데이터 저장하기
export function storeRestaurants(restaurants) {
  try {
    localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants));
  } catch (error) {
    console.error("레스토랑 데이터를 저장하는데 실패했습니다:", error);
  }
}

// localStorage에서 레스토랑 데이터 초기화하기
export function initializeRestaurants(initialData) {
  const storedRestaurants = getStoredRestaurants();

  if (!storedRestaurants) {
    storeRestaurants(initialData);
    return initialData;
  }

  return storedRestaurants;
}

import { getLocalStorage, setLocalStorage, removeItemById, LOCAL_STORAGE_KEYS } from '../util/localStorage';
import { Restaurant } from '../type';
const DATA_URL = 'data/restaurants.json';

async function loadInitialRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('네트워크 오류 발생');
    return await response.json();
  } catch (error) {
    console.error('❌ 초기 음식점 데이터를 불러오는 데 실패했습니다:', error);
    return [];
  }
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  let restaurants = getLocalStorage<Restaurant[]>(LOCAL_STORAGE_KEYS.RESTAURANT, []);

  if (restaurants.length === 0) {
    restaurants = await loadInitialRestaurants();
    setLocalStorage(LOCAL_STORAGE_KEYS.RESTAURANT, restaurants);
  }

  return restaurants;
}

export async function addRestaurant(newRestaurant: Restaurant): Promise<void> {
  const storedRestaurants = await getAllRestaurants();
  storedRestaurants.push(newRestaurant);
  setLocalStorage(LOCAL_STORAGE_KEYS.RESTAURANT, storedRestaurants);
}

export async function removeRestaurant(id: number): Promise<void> {
  removeItemById<Restaurant>(LOCAL_STORAGE_KEYS.RESTAURANT, id);

  removeItemById(LOCAL_STORAGE_KEYS.FAVORITE, id);

  const restaurantItem = document.querySelector(`.restaurant[data-id="${id}"]`);
  if (restaurantItem) {
    restaurantItem.remove();
  }
}

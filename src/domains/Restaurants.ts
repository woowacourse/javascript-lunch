import { DEFAULT_DATA } from "../constants/MenuApp";

type Category = "한식" | "일식" | "아시안" | "양식" | "중식" | "전체" | "기타";
type Distance = 5 | 10 | 15 | 20 | 30;
type SortType = "이름순" | "거리순";

interface TRestaurant {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
}

const RESTAURANT_KEY = "restaurants";

const getRestaurantFromStorage = () => {
  const storedRestaurants = localStorage.getItem(RESTAURANT_KEY);
  if (!storedRestaurants) return [];

  return JSON.parse(storedRestaurants);
};

export const initResaurantStorage = () => {
  if (getRestaurantFromStorage().length > 0) {
    return;
  }

  DEFAULT_DATA.forEach((data: TRestaurant) => {
    add(data);
  });
};

export const filterByCategory = (category: Category) => {
  const restaurants: TRestaurant[] = getRestaurantFromStorage();

  if (category === "전체") return restaurants;

  return restaurants.filter((item) => item.category === category);
};

const sortByName = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => (a.name < b.name ? -1 : 1));
};

const sortByDistance = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => a.distance - b.distance);
};

export const sortByType = (category: Category, type: SortType) => {
  const filteredRestaurants = filterByCategory(category);

  return type === "이름순"
    ? sortByName(filteredRestaurants)
    : sortByDistance(filteredRestaurants);
};

export const add = (restaurantInfo: TRestaurant) => {
  const storedRestaurants = getRestaurantFromStorage();
  localStorage.setItem(
    RESTAURANT_KEY,
    JSON.stringify([...storedRestaurants, restaurantInfo])
  );
};

// 지니

// - 항상 어떤 변화가 생기든, 로컬 스토리지에 그 변화를 저장하고 + 그 변화된 데이터를 클래스가 받아오니까
// -> 멤버변수를 둘 필요가 없다
// -> 인스턴스를 굳이? 생성해야 할까

// -> restaurantList에서 생성하는 인스턴스
// -> addForm에서 생성하는 인스턴스

// ->

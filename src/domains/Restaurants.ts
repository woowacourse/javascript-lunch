import { DEFAULT_DATA } from "../constants/MenuApp";
import restaurantValidator from "../validators/restaurantValidator";

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

  return JSON.parse(storedRestaurants) as TRestaurant[];
};

const isAlreadyExist = (newRestaurantName: string) => {
  const storedRestaurants = getRestaurantFromStorage();
  return storedRestaurants.some(
    ({ name }) => trimAllSpace(newRestaurantName) === trimAllSpace(name)
  );
};

export const validateRestaurantData = (restaurantInfo: TRestaurant) => {
  const { name, category, distance, description, link } = restaurantInfo;

  if (!restaurantValidator.isInRange(name, 0, 10)) {
    throw new Error("error");
  }
  if (!restaurantValidator.isSelected(category)) {
    throw new Error("error");
  }
  if (!restaurantValidator.isSelected(distance)) {
    throw new Error("error");
  }
  if (description && !restaurantValidator.isInRange(description, 0, 300)) {
    throw new Error("error");
  }
  if (link && !restaurantValidator.isValidLink(link)) {
    throw new Error("error");
  }
  if (isAlreadyExist(name)) {
    throw new Error("error");
  }
};

const sortByName = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => (a.name < b.name ? -1 : 1));
};

const sortByDistance = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => a.distance - b.distance);
};

const trimAllSpace = (str: string): string => {
  return str.replaceAll(" ", "");
};

export const initResaurantStorage = () => {
  if (getRestaurantFromStorage().length > 0) {
    return;
  }

  DEFAULT_DATA.forEach((data: TRestaurant) => {
    add(data);
  });
};

export const add = (restaurantInfo: TRestaurant) => {
  const storedRestaurants = getRestaurantFromStorage();
  validateRestaurantData(restaurantInfo);

  localStorage.setItem(
    RESTAURANT_KEY,
    JSON.stringify([...storedRestaurants, restaurantInfo])
  );

  return true;
};

export const filterByCategory = (category: Category) => {
  const restaurants: TRestaurant[] = getRestaurantFromStorage();

  if (category === "전체") return restaurants;

  return restaurants.filter((item) => item.category === category);
};

export const sortByType = (category: Category, type: SortType) => {
  const filteredRestaurants = filterByCategory(category);

  return type === "이름순"
    ? sortByName(filteredRestaurants)
    : sortByDistance(filteredRestaurants);
};

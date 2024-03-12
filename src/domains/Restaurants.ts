import { DEFAULT_RESTAURANT_DATA, ERROR_MESSAGES } from "../constants/MenuApp";
import restaurantValidator from "../validators/restaurantValidator";

type CategoryType =
  | "한식"
  | "일식"
  | "아시안"
  | "양식"
  | "중식"
  | "전체"
  | "기타";
type DistanceType = 5 | 10 | 15 | 20 | 30;
type SortType = "이름순" | "거리순";
interface RestaurantType {
  name: string;
  category: CategoryType;
  distance: DistanceType;
  description?: string;
  link?: string;
}

const RESTAURANT_KEY = "restaurants";

const getRestaurantFromStorage = () => {
  const storedRestaurants = localStorage.getItem(RESTAURANT_KEY);
  if (!storedRestaurants) return [];

  return JSON.parse(storedRestaurants) as RestaurantType[];
};

const isAlreadyExist = (newRestaurantName: string) => {
  const storedRestaurants = getRestaurantFromStorage();

  return storedRestaurants.some(
    ({ name }) => trimAllSpace(newRestaurantName) === trimAllSpace(name)
  );
};

export const validateRestaurantData = (restaurantInfo: RestaurantType) => {
  const { name, category, distance, description, link } = restaurantInfo;

  if (!restaurantValidator.isSelected(category)) {
    throw new Error(ERROR_MESSAGES.invalidCategory);
  }
  if (!restaurantValidator.isInRange(name, 0, 10)) {
    throw new Error(ERROR_MESSAGES.invalidRestaurantName);
  }
  if (!restaurantValidator.isSelected(distance)) {
    throw new Error(ERROR_MESSAGES.invalidDistance);
  }
  if (description && !restaurantValidator.isInRange(description, 0, 300)) {
    throw new Error(ERROR_MESSAGES.invalidDescriptionLength);
  }
  if (link && !restaurantValidator.isValidLink(link)) {
    throw new Error(ERROR_MESSAGES.invalidLink);
  }
  if (isAlreadyExist(name)) {
    throw new Error(ERROR_MESSAGES.invalidRestaurantUniqueness);
  }
};

const sortByName = (restaurants: RestaurantType[]) => {
  return [...restaurants].sort((a, b) => (a.name < b.name ? -1 : 1));
};

const sortByDistance = (restaurants: RestaurantType[]) => {
  return [...restaurants].sort((a, b) => a.distance - b.distance);
};

const trimAllSpace = (str: string): string => {
  return str.replaceAll(" ", "");
};

export const add = (restaurantInfo: RestaurantType) => {
  const storedRestaurants = getRestaurantFromStorage();
  validateRestaurantData(restaurantInfo);

  localStorage.setItem(
    RESTAURANT_KEY,
    JSON.stringify([...storedRestaurants, restaurantInfo])
  );

  return true;
};

export const initRestaurantStorage = () => {
  if (getRestaurantFromStorage().length > 0) {
    return;
  }

  DEFAULT_RESTAURANT_DATA.forEach((data: RestaurantType) => {
    add(data);
  });
};

export const filterByCategory = (category: CategoryType) => {
  const restaurants: RestaurantType[] = getRestaurantFromStorage();

  if (category === "전체") return restaurants;

  return restaurants.filter((item) => item.category === category);
};

export const sortByType = (category: CategoryType, type: SortType) => {
  const filteredRestaurants = filterByCategory(category);
  return type === "이름순"
    ? sortByName(filteredRestaurants)
    : sortByDistance(filteredRestaurants);
};

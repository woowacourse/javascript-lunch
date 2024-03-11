import { DEFAULT_DATA, ERROR_MESSAGES } from "../constants/menu";
import { Category, RestaurantItem } from "../types/menu";
import restaurantValidator from "../validators/restaurantValidator";

type SortType = "이름순" | "거리순";
const RESTAURANT_KEY = "restaurants";

const getRestaurantFromStorage = () => {
  const storedRestaurants = localStorage.getItem(RESTAURANT_KEY);
  if (!storedRestaurants) return [];

  return JSON.parse(storedRestaurants) as RestaurantItem[];
};

const isAlreadyExist = (newRestaurantName: string) => {
  const storedRestaurants = getRestaurantFromStorage();

  return storedRestaurants.some(
    ({ name }) => trimAllSpace(newRestaurantName) === trimAllSpace(name)
  );
};

export const validateRestaurantData = (restaurantInfo: RestaurantItem) => {
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

const sortByName = (restaurants: RestaurantItem[]) => {
  return [...restaurants.sort((a, b) => (a.name < b.name ? -1 : 1))];
};

const sortByDistance = (restaurants: RestaurantItem[]) => {
  return [...restaurants.sort((a, b) => a.distance - b.distance)];
};

const trimAllSpace = (str: string): string => {
  return str.replaceAll(" ", "");
};

export const initRestaurantStorage = () => {
  if (getRestaurantFromStorage().length > 0) {
    return;
  }

  DEFAULT_DATA.forEach((data: RestaurantItem) => {
    add(data);
  });
};

export const add = (restaurantInfo: RestaurantItem) => {
  const storedRestaurants = getRestaurantFromStorage();
  validateRestaurantData(restaurantInfo);

  localStorage.setItem(
    RESTAURANT_KEY,
    JSON.stringify([...storedRestaurants, restaurantInfo])
  );

  return true;
};

export const filterByCategory = (category: Category) => {
  const restaurants: RestaurantItem[] = getRestaurantFromStorage();

  if (category === "전체") return restaurants;

  return restaurants.filter((item) => item.category === category);
};

export const sortByType = (category: Category, type: SortType) => {
  const filteredRestaurants = filterByCategory(category);

  return type === "이름순"
    ? sortByName(filteredRestaurants)
    : sortByDistance(filteredRestaurants);
};

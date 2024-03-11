import { DEFAULT_DATA, ERROR_MESSAGES } from "../constants/MenuApp";
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

const sortByName = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => (a.name < b.name ? -1 : 1));
};

const sortByDistance = (restaurants: TRestaurant[]) => {
  return restaurants.sort((a, b) => a.distance - b.distance);
};

const trimAllSpace = (str: string): string => {
  return str.replaceAll(" ", "");
};

export const initRestaurantStorage = () => {
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

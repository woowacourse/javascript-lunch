import { CATEGORIES, DEFAULT_DATA, ERROR_MESSAGES, SORT_TYPE } from "../constants/menu";
import { CategoryString, RestaurantAddItem, RestaurantItem, SortOptionString } from "../types/menu";
import restaurantValidator from "../validators/restaurantValidator";

const RESTAURANT_KEY = "restaurants";

const getRestaurantFromStorage = () => {
  const storedRestaurants = localStorage.getItem(RESTAURANT_KEY);
  if (!storedRestaurants) return [];

  return JSON.parse(storedRestaurants) as RestaurantItem[];
};

const isAlreadyExist = (newRestaurantName: string) => {
  const storedRestaurants = getRestaurantFromStorage();

  return storedRestaurants.some(({ name }) => trimAllSpace(newRestaurantName) === trimAllSpace(name));
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

export const validateRestaurantData = (restaurantInfo: RestaurantAddItem) => {
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

export const findRestaurantByName = (restaurantName: string): RestaurantItem | null => {
  const storedRestaurants = getRestaurantFromStorage();
  const foundRestaurant = storedRestaurants.find(({ name }) => name === restaurantName);

  return foundRestaurant ? foundRestaurant : null;
};

export const toggleFavoriteStateByName = (targetName: string) => {
  const storedRestaurants = getRestaurantFromStorage();
  const updatedRestaurants = storedRestaurants.map((restaurant) => {
    return restaurant.name !== targetName
      ? {
          ...restaurant,
        }
      : {
          ...restaurant,
          isFavorite: restaurant.isFavorite ? false : true,
        };
  });

  localStorage.setItem(RESTAURANT_KEY, JSON.stringify(updatedRestaurants));
};

export const deleteRestaurantByName = (restaurantName: string): void => {
  const storedRestaurants = getRestaurantFromStorage();
  const filteredRestaurants = storedRestaurants.filter(({ name }) => restaurantName !== name);

  localStorage.setItem(RESTAURANT_KEY, JSON.stringify(filteredRestaurants));
};

export const getFavoriteRestaurants = (): RestaurantItem[] | [] => {
  const storedRestaurants = getRestaurantFromStorage();

  return storedRestaurants.filter(({ isFavorite }) => isFavorite);
};

export const add = (restaurantInfo: RestaurantAddItem) => {
  const storedRestaurants = getRestaurantFromStorage();
  validateRestaurantData(restaurantInfo);

  localStorage.setItem(
    RESTAURANT_KEY,
    JSON.stringify([...storedRestaurants, { ...restaurantInfo, isFavorite: false }])
  );

  return true;
};

export const filterByCategory = (category: CategoryString) => {
  const restaurants: RestaurantItem[] = getRestaurantFromStorage();

  if (category === CATEGORIES.all) return restaurants;

  return restaurants.filter((item) => item.category === category);
};

export const sortByType = (category: CategoryString, type: SortOptionString) => {
  const filteredRestaurants = filterByCategory(category);

  return type === SORT_TYPE.name ? sortByName(filteredRestaurants) : sortByDistance(filteredRestaurants);
};

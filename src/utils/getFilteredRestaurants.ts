import { FilterOptions, Restaurant } from "../../types";
import {
  CATEGORY,
  DEFAULT_FILTER_OPTIONS,
  LABEL_KEYS,
  NAV_BAR_KEYS,
} from "../constants";

const getFilteredRestaurants = (
  restaurants: Restaurant[],
  options: FilterOptions = DEFAULT_FILTER_OPTIONS
): Restaurant[] => {
  const {
    tabType,
    filterType: { categoryFilterType, sortFilterType },
  } = options;
  const copiedRestaurants = [...restaurants];

  const tabTypeFn = {
    [NAV_BAR_KEYS.all]: (restaurantsInfo: Restaurant[]) => {
      if (categoryFilterType === CATEGORY[0]) return restaurantsInfo;
      return restaurantsInfo.filter(
        (restaurant) => restaurant.category === categoryFilterType
      );
    },
    [NAV_BAR_KEYS.favorite]: (restaurantsInfo: Restaurant[]) => {
      return restaurantsInfo.filter((restaurant) => restaurant.isFavorite);
    },
  };

  const sortFilterTypeFn = {
    [LABEL_KEYS.name]: (restaurantsInfo: Restaurant[]) => {
      return restaurantsInfo.sort((a, b) => a.name.localeCompare(b.name));
    },
    [LABEL_KEYS.distance]: (restaurantsInfo: Restaurant[]) => {
      return restaurantsInfo.sort(
        (a, b) => parseInt(a.distance) - parseInt(b.distance)
      );
    },
  };

  if (tabType === NAV_BAR_KEYS.favorite) {
    return tabTypeFn[tabType](copiedRestaurants);
  }

  return sortFilterTypeFn[sortFilterType](
    tabTypeFn[tabType](copiedRestaurants)
  );
};

export default getFilteredRestaurants;

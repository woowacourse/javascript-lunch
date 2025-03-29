import RestaurantList from "./components/RestaurantList.ts";
import { Category, Restaurant, SortType } from "./types/restaurant.ts";
import { $ } from "./utils/dom.ts";
import { restaurantManager } from "./restaurantManager.ts";

type State = {
  tab: "모든 음식점" | "자주 가는 음식점";
  category: Category;
  sortType: SortType;
  restaurants: Restaurant[];
};

const state: State = {
  tab: "모든 음식점",
  category: "전체",
  sortType: "name",
  restaurants: [],
};

const loadRestaurantListData = () => {
  state.restaurants = restaurantManager.getInitialData();
};

const updateRestaurantList = (restaurants: Restaurant[]) => {
  setStateRestaurant(restaurants);

  const filter = {
    tab: state.tab,
    category: state.category,
    sortType: state.sortType,
  };

  try {
    const $el = getRestaurantListElement();
    RestaurantList({
      restaurants,
      filter,
      setRestaurant: updateRestaurantList,
      el: $el,
    });
  } catch (e) {
    console.error(e);
  }
};

const setStateRestaurant = (restaurants: Restaurant[]) => {
  state.restaurants = restaurants;
};

const getRestaurantListElement = () => {
  const $el = $(".restaurant-list");
  if (!$el) {
    throw new Error("음식점 목록을 찾을 수 없습니다.");
  }
  return $el;
};

export default {
  state,
  loadRestaurantListData: loadRestaurantListData,
  update: updateRestaurantList,
};

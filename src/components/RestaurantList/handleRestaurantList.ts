import RestaurantList from ".";
import { restaurants } from "../../domain/restaurants";
import defaultRestaurants from "../../tools/defaultRestaurants";
import Storage from "../../tools/Storage";
import IRestaurant from "../../type/IRestaurant";
import BottomSheet from "../BottomSheet";

export const renderRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.render();
  }
};

export const onclickRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  restaurantList?.addEventListener("click", (event) => {
    event.stopPropagation();
    const id = (event.target as HTMLElement).closest("restaurant-item")?.id;
    onClickRestaurantItem(id as string);
  });
};

// 리팩토링 필요
export const onClickRestaurantItem = (id: string) => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (bottomSheet instanceof BottomSheet) {
    bottomSheet.open(`<restaurant-view restaurant-id=${id}></restaurant-view>`);
  }
};

// 다른 폴더로 이동 예정
export const addRestaurant = (newRestaurant: IRestaurant) => {
  restaurants.state.restaurants = [
    ...restaurants.state.restaurants,
    newRestaurant,
  ];
  Storage.saveRestaurants(restaurants.state.restaurants);
};

// 다른 폴더로 이동 예정
export const restoreRestaurants = () => {
  const restoredRestaurants = Storage.loadRestaurants();
  restaurants.state.restaurants =
    restoredRestaurants.length > 0 ? restoredRestaurants : defaultRestaurants;
};

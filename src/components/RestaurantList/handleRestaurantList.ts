import RestaurantList from ".";
import BottomSheet from "../BottomSheet";
import { openBottomSheet } from "../BottomSheet/handleBottomSheet";

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
  openBottomSheet(`<restaurant-view restaurant-id=${id}></restaurant-view>`);
};

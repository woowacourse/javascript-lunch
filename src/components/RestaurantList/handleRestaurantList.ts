import RestaurantList from ".";
import { onClickRestaurantItem } from "../RestaurantItem/handleRestaurantItem";

export const renderRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.render();
  }
};

export const onClickRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  restaurantList?.addEventListener("click", (event) => {
    event.stopPropagation();
    const id = (event.target as HTMLElement).closest("restaurant-item")?.id;
    onClickRestaurantItem(id as string);
  });

};

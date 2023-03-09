import RestaurantList from ".";
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

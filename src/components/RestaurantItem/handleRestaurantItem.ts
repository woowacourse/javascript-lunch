import { openBottomSheet } from "../BottomSheet/handleBottomSheet";

export const onClickRestaurantItem = (id: string) => {
  openBottomSheet(`<restaurant-view restaurant-id=${id}></restaurant-view>`);
};

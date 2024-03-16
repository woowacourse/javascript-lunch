import { defaultImg } from "../assets";
import { CATEGORY_TO_IMG } from "../components/RestaurantItem";

export const categoryToImg = (category) => {
  return CATEGORY_TO_IMG[category] || defaultImg;
};

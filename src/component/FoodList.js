import { getImgSrcAlt } from "../util/getImgSrcAlt.js";
import { FoodItem } from "./FoodItem.js";

export function FoodList({ foodItems }) {
  const foodList = document.createElement("ul");
  foodList.classList.add("restaurant-list");
  const foodFragment = document.createDocumentFragment();

  foodItems.forEach((foodItem) => {
    const { imgSrc, imgAlt } = getImgSrcAlt(foodItem.category);

    foodFragment.appendChild(
      FoodItem({
        imgSrc: imgSrc,
        imgAlt: imgAlt,
        name: foodItem.name,
        distance: foodItem.distance,
        description: foodItem.description,
        link: foodItem.link,
      })
    );
  });

  foodList.appendChild(foodFragment);
  return foodList;
}

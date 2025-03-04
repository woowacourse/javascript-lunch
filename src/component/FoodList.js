import { FoodItem } from "./FoodItem.js";

export function FoodList({ foodItems }) {
  const foodList = document.createElement("ul");
  const foodFragment = document.createDocumentFragment();

  foodItems.forEach((foodItem) => {
    foodFragment.appendChild(
      FoodItem({
        imgSrc: foodItem.imgSrc,
        imgAlt: foodItem.imgAlt,
        name: foodItem.name,
        distance: foodItem.distance,
        description: foodItem.description,
      })
    );
  });

  foodList.appendChild(foodFragment);
  return foodList;
}

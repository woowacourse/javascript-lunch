import { getInput } from "../../util/getInput";

function getFoodItemList() {
  return document.querySelectorAll(".restaurant-list li");
}

function getFoodItem() {
  return {
    category: getInput("category"),
    name: getInput("name"),
    distance: getInput("distance"),
    description: getInput("description"),
    link: getInput("link"),
  };
}

function updateFoodList(foodItems) {
  const foodListContainer = document.querySelector(".restaurant-list");
  foodListContainer.innerHTML = "";
  foodItems.forEach((item) => {
    foodListContainer.appendChild(item);
  });
}

export { getFoodItem, getFoodItemList, updateFoodList };

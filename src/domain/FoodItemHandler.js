import { getInput } from "./getInput";

export class FoodItemHandler {
  static getFoodItemList() {
    return document.querySelectorAll(".restaurant-list li");
  }

  static getFoodItem() {
    return {
      category: getInput("category"),
      name: getInput("name"),
      distance: getInput("distance"),
      description: getInput("description"),
      link: getInput("link"),
    };
  }

  static updateFoodList(foodItems) {
    const foodListContainer = document.querySelector(".restaurant-list");
    foodListContainer.innerHTML = "";
    foodItems.forEach((item) => {
      foodListContainer.appendChild(item);
    });
  }
}

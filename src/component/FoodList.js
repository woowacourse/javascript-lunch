// import { getImgSrcAlt } from "../util/getImgSrcAlt.js";

export class FoodList {
  foodItems;

  constructor() {
    this.foodItems = this.getPreviousFoodList();
  }

  getPreviousFoodList() {
    const foodItems = document.querySelectorAll(".restaurant-list li");
    return foodItems;
  }

  updateFoodList(foodItem) {
    this.foodItems = [...this.foodItems, foodItem];
    const foodListContainer = document.querySelector(".restaurant-list");
    foodListContainer.innerHTML = "";
    this.foodItems.forEach((item) => {
      foodListContainer.appendChild(item);
    });
  }
}

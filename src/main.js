import { FoodItem } from "./component/FoodItem.js";
import { FoodList } from "./component/FoodList.js";
import { HeaderComponent } from "./component/HeaderComponent.js";
import { foodItems } from "./mock/foodItems.js";

addEventListener("load", () => {
  const body = document.querySelector("body");
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));

  body.appendChild(FoodList({ foodItems: foodItems }));
});

import { FoodList } from "./component/FoodList.js";
import { foodItems } from "./mock/mockItem.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const foodList = FoodList({ foodItems: foodItems });
  FoodListPage(foodList);
});

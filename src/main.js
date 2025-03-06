import { FoodForm } from "./component/FoodForm.js";
import { FoodItem } from "./component/FoodItem.js";
import { FoodList } from "./component/FoodList.js";
import { HeaderComponent } from "./component/HeaderComponent.js";
import { Modal } from "./component/Modal.js";
import { foodItems } from "./mock/foodItems.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const foodList = FoodList({ foodItems: foodItems });
  FoodListPage(foodList);
});

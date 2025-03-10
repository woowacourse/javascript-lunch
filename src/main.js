import { IconButton } from "./component/button/IconButton.js";
import { FoodForm } from "./component/FoodForm.js";
import { Modal } from "./component/layout/Modal.js";
import { foodItems } from "./mock/mockItem.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const addFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: Modal.open,
  });

  const foodListPage = new FoodListPage("점심 뭐먹지", addFoodItemIcon);

  const modal = new Modal(FoodForm());
});

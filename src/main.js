import { IconButton } from "./component/button/IconButton.js";
import { FoodForm } from "./component/FoodForm.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import {
  getStorageFoodList,
  saveInitFoodList,
} from "./domain/handler/FoodItemHandler.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: Modal.open,
  });

  const filter = new Filter();
  const foodListPage = new FoodListPage(
    "점심 뭐 먹지",
    AddFoodItemIcon,
    filter
  );
  saveInitFoodList();

  const modal = new Modal(FoodForm(filter));
});

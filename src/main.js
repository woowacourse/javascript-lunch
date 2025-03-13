import { IconButton } from "./component/button/IconButton.js";
import { FoodForm } from "./pages/FoodForm.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import {
  getStorageFoodList,
  saveInitFoodList,
} from "./domain/handler/FoodItemHandler.js";
import { FoodListPage } from "./pages/FoodListPage.js";
import { FoodDetail } from "./pages/FoodDetail.js";
import { foodItems } from "./mocks/foodItems.js";

addEventListener("load", () => {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    // onClick: Modal.open,
  });

  const filter = new Filter();
  const foodListPage = new FoodListPage(
    "점심 뭐 먹지",
    AddFoodItemIcon,
    filter
  );

  const modal = new Modal();
  saveInitFoodList(modal);
  setFoodFormMoal(filter, modal);

  document
    .querySelector("select[name=category]")
    .addEventListener("change", () => {
      filter.changeCategory(modal);
    });

  console.log(document.querySelector("select[name=category]"));
  document
    .querySelector("select[name=sorting]")
    .addEventListener("change", () => {
      filter.changeSorting(modal);
    });
});

function setFoodFormMoal(filter, modal) {
  document.querySelector(".gnb__button").addEventListener("click", () => {
    modal.setModalContent(FoodForm(filter, modal));
    Modal.open();
  });
}

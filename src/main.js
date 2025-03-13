import { IconButton } from "./component/button/IconButton.js";
import { FoodForm } from "./pages/FoodForm.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import {
  convertStorageToLocal,
  readFoodList,
} from "./domain/handler/FoodItemHandler.js";
import { FoodListPage } from "./pages/FoodListPage.js";
import { foodItems } from "./mocks/foodItems.js";

addEventListener("load", () => {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
  });

  const filter = new Filter();

  const foodListPage = new FoodListPage(
    "점심 뭐 먹지",
    AddFoodItemIcon,
    filter
  );
  const modal = new Modal();

  readFoodList(filter, modal); //mock 데이터 로딩
  setFoodFormMoal(filter, modal);
  setFilteredItems(filter, modal);
});

function setFoodFormMoal(filter, modal) {
  document.querySelector(".gnb__button").addEventListener("click", () => {
    modal.setModalContent(FoodForm(filter, modal));
    Modal.open();
  });
}

function setFilteredItems(filter, modal) {
  document
    .querySelector("select[name=category]")
    .addEventListener("change", () => {
      const filteredItems = filter.changeCategory();
      convertStorageToLocal(modal, filter, filteredItems);
    });

  document
    .querySelector("select[name=sorting]")
    .addEventListener("change", () => {
      const filteredItems = filter.changeSorting();
      convertStorageToLocal(modal, filter, filteredItems);
    });
}

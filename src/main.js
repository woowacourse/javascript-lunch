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

  Modal.setDefaultModal();
  setFoodFormMoal(filter);
  setFilteredItems(filter);
  setFavoriteButton(filter);
});

function setFoodFormMoal(filter) {
  document.querySelector(".gnb__button").addEventListener("click", () => {
    Modal.setContent(FoodForm(filter));
    Modal.open();
  });
}

function setFilteredItems(filter) {
  document
    .querySelector("select[name=category]")
    .addEventListener("change", () => {
      const filteredItems = filter.changeCategory();
      convertStorageToLocal(filter, filteredItems);
    });

  document
    .querySelector("select[name=sorting]")
    .addEventListener("change", () => {
      const filteredItems = filter.changeSorting();
      convertStorageToLocal(filter, filteredItems);
    });
}

function setFavoriteButton(filter) {
  const totalButton = document.querySelector(".tab-button .tab-button_all");
  totalButton.classList.toggle("selected-button");
  const favoriteButton = document.querySelector(
    ".tab-button .tab-button_favorite"
  );
  readFoodList(filter);

  totalButton.addEventListener("click", () => {
    if (totalButton.classList.contains("selected-button")) return;
    totalButton.classList.toggle("selected-button");
    favoriteButton.classList.remove("selected-button");
    readFoodList(filter);
  });

  favoriteButton.addEventListener("click", () => {
    if (favoriteButton.classList.contains("selected-button")) return;
    favoriteButton.classList.toggle("selected-button");
    totalButton.classList.remove("selected-button");
    readFoodList(filter, true);
  });
}

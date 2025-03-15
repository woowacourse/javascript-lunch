import { IconButton } from "./component/button/IconButton.js";
import { FoodForm } from "./pages/FoodForm.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import {
  convertStorageToLocal,
  readFoodList,
} from "./domain/handler/FoodItemHandler.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: () => {},
  });

  const filter = new Filter();

  const foodListPage = new FoodListPage({
    title: "점심 뭐 먹지",
    iconButton: AddFoodItemIcon,
  });

  Modal.setDefaultModal();
  setFoodFormMoal(filter);
  setFilteredItems(filter);
  setFavoriteButton(filter);
});

function setFoodFormMoal(filter: Filter) {
  document.querySelector(".gnb__button")?.addEventListener("click", () => {
    const formContainer = document.createElement("div");
    const header = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
    formContainer.innerHTML = header;

    formContainer.appendChild(FoodForm({ filter }));
    Modal.setContent({ modalContent: formContainer });
    Modal.open();
  });
}

function setFilteredItems(filter: Filter) {
  document
    .querySelector("select[name=category]")
    ?.addEventListener("change", () => {
      const filteredItems = filter.changeCategory();
      convertStorageToLocal({ filter, foodList: filteredItems });
    });

  document
    .querySelector("select[name=sorting]")
    ?.addEventListener("change", () => {
      const filteredItems = filter.changeSorting();
      convertStorageToLocal({ filter, foodList: filteredItems });
    });
}

function setFavoriteButton(filter: Filter) {
  const totalButton = document.querySelector(".tab-button .tab-button_all");
  totalButton?.classList.toggle("selected-button");
  const favoriteButton = document.querySelector(
    ".tab-button .tab-button_favorite"
  );
  readFoodList({ filter, favoriteFilter: false });

  totalButton?.addEventListener("click", () => {
    if (totalButton.classList.contains("selected-button")) return;
    totalButton.classList.toggle("selected-button");
    favoriteButton?.classList.remove("selected-button");
    readFoodList({ filter, favoriteFilter: false });
  });

  favoriteButton?.addEventListener("click", () => {
    if (favoriteButton.classList.contains("selected-button")) return;
    favoriteButton.classList.toggle("selected-button");
    totalButton?.classList.remove("selected-button");
    readFoodList({ filter, favoriteFilter: true });
  });
}

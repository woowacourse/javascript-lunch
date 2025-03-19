import { Modal } from "../../component/layout/Modal";
import {
  createFoodListComponent,
  getFilteredFoodList,
  showConvertedItem,
} from "../service/FoodService";
import { favoriteState } from "../service/FavoriteService";
import { FilterType } from "../../types/domain/FilterType";
import { SetFilteredItemsType } from "../../types/domain/InitAppStateType";
import { Filter } from "../Filter";
import { loadFoodForm } from "./loadFoodForm";

export function loadInitAppState() {
  const filter = new Filter();
  setFoodFormMoal();
  setFilteredItems({ filter });
  setFavoriteButton();
}

// FoodForm 생성
function setFoodFormMoal() {
  document.querySelector(".gnb__button")?.addEventListener("click", () => {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
    formContainer.appendChild(loadFoodForm());
    Modal.setContent({ modalContent: formContainer });
    Modal.open();
  });
}

// Filter 기능 설정
function setFilteredItems({ filter }: SetFilteredItemsType) {
  ["category", "sorting"].forEach((name) => {
    document
      .querySelector(`select[name=${name}]`)
      ?.addEventListener("change", () => {
        const previousFoodList = getFilteredFoodList({
          favoriteFilter: favoriteState(),
        });

        filter.chageFilter({
          filterName: name as FilterType,
        });
        const filteredItems = filter.filteredFoodList({
          foodList: previousFoodList,
        });

        createFoodListComponent({
          foodList: filteredItems,
        });
      });
  });
}

function setFavoriteButton() {
  const buttons = {
    total: document.querySelector(".tab-button .tab-button_all"),
    favorite: document.querySelector(".tab-button .tab-button_favorite"),
  };
  buttons.total?.classList.toggle("selected-button");
  updateFoodList(false);

  Object.entries(buttons).forEach(([key, button]) => {
    button?.addEventListener("click", () => {
      if (button.classList.contains("selected-button")) return;
      button.classList.toggle("selected-button");
      buttons[key === "total" ? "favorite" : "total"]?.classList.remove(
        "selected-button"
      );
      updateFoodList(key === "favorite");
    });
  });
}

function updateFoodList(isFavorite: boolean) {
  showConvertedItem({ favoriteFilter: isFavorite });
}

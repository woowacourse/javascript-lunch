import { Modal } from "../component/layout/Modal";
import {
  createFoodListComponent,
  getFilteredFoodList,
  showConvertedItem,
} from "./FoodService";
import { favoriteState } from "./FavoriteService";
import { FoodForm } from "../pages/FoodForm";
import { FilterType } from "../types/domain/FilterType";
import { InitAppStateType } from "../types/domain/InitAppStateType";
import { Filter } from "./Filter";

export function initAppState({ filter }: InitAppStateType) {
  setFoodFormMoal({ filter });
  setFilteredItems({ filter });
  setFavoriteButton({ filter });
}

// FoodForm 생성
function setFoodFormMoal({ filter }: InitAppStateType) {
  document.querySelector(".gnb__button")?.addEventListener("click", () => {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
    formContainer.appendChild(FoodForm({ filter: filter }));
    Modal.setContent({ filter: filter, modalContent: formContainer });
    Modal.open();
  });
}

// Filter 기능 설정
function setFilteredItems({ filter }: InitAppStateType) {
  ["category", "sorting"].forEach((name) => {
    document
      .querySelector(`select[name=${name}]`)
      ?.addEventListener("change", () => {
        const previousFoodList = getFilteredFoodList({
          favoriteFilter: favoriteState(),
        });

        filter.chageFilter({
          filter: name as FilterType,
        });
        const filteredItems = filter.filterFoodList({
          foodList: previousFoodList,
        });

        createFoodListComponent({
          filter: filter,
          foodList: filteredItems,
        });
      });
  });
}

function setFavoriteButton({ filter }: InitAppStateType) {
  const buttons = {
    total: document.querySelector(".tab-button .tab-button_all"),
    favorite: document.querySelector(".tab-button .tab-button_favorite"),
  };
  buttons.total?.classList.toggle("selected-button");
  updateFoodList(false, filter);

  Object.entries(buttons).forEach(([key, button]) => {
    button?.addEventListener("click", () => {
      if (button.classList.contains("selected-button")) return;
      button.classList.toggle("selected-button");
      buttons[key === "total" ? "favorite" : "total"]?.classList.remove(
        "selected-button"
      );
      updateFoodList(key === "favorite", filter);
    });
  });
}

function updateFoodList(isFavorite: boolean, filter: Filter) {
  showConvertedItem({ filter, favoriteFilter: isFavorite });
}

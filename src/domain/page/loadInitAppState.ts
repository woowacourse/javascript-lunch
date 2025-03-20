import { Modal } from "../../component/layout/Modal";
import {
  createFoodListComponent,
  favoriteFilteredFoodList,
  renderFilteredFoodList,
} from "../service/FoodService";
import { loadFoodForm } from "./loadFoodForm";
import { favoriteFilter } from "../FavoriteFilter";
import { sortingFilter } from "../SortingFilter";

export function loadInitAppState() {
  setFoodFormMoal();
  setFilteredItems();
  setFavoriteFilter();
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

// SortingFilter 기능 설정
function setFilteredItems() {
  const filterTabs = ["category", "sorting"] as const;

  filterTabs.forEach((name) => {
    document
      .querySelector(`select[name=${name}]`)
      ?.addEventListener("change", () => {
        const previousFoodList = favoriteFilteredFoodList({
          isFavoriteFilterActive: favoriteFilter.currentStatus(),
        });

        sortingFilter.chageFilter({
          filterName: name,
        });
        const filteredItems = sortingFilter.filterAndSortFoodList({
          foodList: previousFoodList,
        });

        createFoodListComponent({
          foodList: filteredItems,
        });
      });
  });
}

function setFavoriteFilter() {
  const buttons = {
    total: document.querySelector(".tab-button .tab-button_all"),
    favorite: document.querySelector(".tab-button .tab-button_favorite"),
  };

  if (!buttons.total || !buttons.favorite) return;

  buttons.total.classList.toggle("selected-button");
  renderFilteredFoodList({ isFavoriteFilterActive: false });

  Object.entries(buttons).forEach(([_, button]) =>
    button?.addEventListener("click", () =>
      favoriteFilter.toggleFilter({
        cuttentButton: button,
        previousButton:
          button === buttons.total! ? buttons.favorite! : buttons.total!,
      })
    )
  );
}

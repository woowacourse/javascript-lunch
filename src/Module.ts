import { Modal } from "./component/layout/Modal";
import { Filter } from "./domain/Filter";
import {
  convertStorageToLocal,
  readFoodList,
  showConvertedItem,
} from "./domain/handler/FoodItemHandler";
import { isFavoriteState } from "./domain/handler/TabButtonHandler";
import { FoodForm } from "./pages/FoodForm";
import { FilterType } from "./types/domain/FilterType";

export class Module {
  #filter;

  constructor(filter: Filter) {
    this.#filter = filter;
  }

  init() {
    this.#setFoodFormMoal();
    this.#setFilteredItems();
    this.#setFavoriteButton();
  }

  // FoodForm 생성
  #setFoodFormMoal() {
    document.querySelector(".gnb__button")?.addEventListener("click", () => {
      const formContainer = document.createElement("div");
      formContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
      formContainer.appendChild(FoodForm({ filter: this.#filter }));
      Modal.setContent({ modalContent: formContainer });
      Modal.open();
    });
  }

  // Filter 기능 설정
  #setFilteredItems() {
    ["category", "sorting"].forEach((name) => {
      document
        .querySelector(`select[name=${name}]`)
        ?.addEventListener("change", () => {
          const previousFoodList = readFoodList({
            favoriteFilter: isFavoriteState(),
          });

          const filteredItems = this.#filter.chageFilter({
            foodList: previousFoodList,
            filter: name as FilterType,
          });

          convertStorageToLocal({
            filter: this.#filter,
            foodList: filteredItems,
          });
        });
    });
  }

  #setFavoriteButton() {
    const buttons = {
      total: document.querySelector(".tab-button .tab-button_all"),
      favorite: document.querySelector(".tab-button .tab-button_favorite"),
    };
    buttons.total?.classList.toggle("selected-button");
    this.#updateFoodList(false);

    Object.entries(buttons).forEach(([key, button]) => {
      button?.addEventListener("click", () => {
        if (button.classList.contains("selected-button")) return;
        button.classList.toggle("selected-button");
        buttons[key === "total" ? "favorite" : "total"]?.classList.remove(
          "selected-button"
        );
        this.#updateFoodList(key === "favorite");
      });
    });
  }

  #updateFoodList(isFavorite: boolean) {
    showConvertedItem({ filter: this.#filter, favoriteFilter: isFavorite });
  }
}

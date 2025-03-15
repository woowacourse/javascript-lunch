import { Modal } from "./component/layout/Modal";
import { Filter } from "./domain/Filter";
import {
  convertStorageToLocal,
  readFoodList,
  sortedFoodList,
} from "./domain/handler/FoodItemHandler";
import { FoodForm } from "./pages/FoodForm";

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

  #setFoodFormMoal() {
    document.querySelector(".gnb__button")?.addEventListener("click", () => {
      const formContainer = document.createElement("div");
      const header = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
      formContainer.innerHTML = header;

      formContainer.appendChild(FoodForm({ filter: this.#filter }));
      Modal.setContent({ modalContent: formContainer });
      Modal.open();
    });
  }

  #setFilteredItems() {
    document
      .querySelector("select[name=category]")
      ?.addEventListener("change", () => {
        const previousFoodList = readFoodList({ favoriteFilter: false });
        const filteredItems = this.#filter.changeCategory({
          foodList: previousFoodList,
        });
        convertStorageToLocal({
          filter: this.#filter,
          foodList: filteredItems,
        });
      });

    document
      .querySelector("select[name=sorting]")
      ?.addEventListener("change", () => {
        const previousFoodList = readFoodList({ favoriteFilter: false });
        const filteredItems = this.#filter.changeSorting({
          foodList: previousFoodList,
        });
        convertStorageToLocal({
          filter: this.#filter,
          foodList: filteredItems,
        });
      });
  }

  #setFavoriteButton() {
    const totalButton = document.querySelector(".tab-button .tab-button_all");
    totalButton?.classList.toggle("selected-button");
    const favoriteButton = document.querySelector(
      ".tab-button .tab-button_favorite"
    );
    const previousFoodList = readFoodList({ favoriteFilter: false });
    convertStorageToLocal({
      filter: this.#filter,
      foodList: sortedFoodList({
        filter: this.#filter,
        foodList: previousFoodList,
      }),
    });

    totalButton?.addEventListener("click", () => {
      if (totalButton.classList.contains("selected-button")) return;
      totalButton.classList.toggle("selected-button");
      favoriteButton?.classList.remove("selected-button");

      const previousFoodList = readFoodList({ favoriteFilter: false });
      convertStorageToLocal({
        filter: this.#filter,
        foodList: sortedFoodList({
          filter: this.#filter,
          foodList: previousFoodList,
        }),
      });
    });

    favoriteButton?.addEventListener("click", () => {
      if (favoriteButton.classList.contains("selected-button")) return;
      favoriteButton.classList.toggle("selected-button");
      totalButton?.classList.remove("selected-button");
      const previousFoodList = readFoodList({ favoriteFilter: true });
      convertStorageToLocal({
        filter: this.#filter,
        foodList: sortedFoodList({
          filter: this.#filter,
          foodList: previousFoodList,
        }),
      });
    });
  }
}

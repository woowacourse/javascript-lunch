import { EMPTY_LIST } from "../../constants/systemMessage.ts";
import { filterFoodItemsByCategory } from "../../util/filterFoodItems.ts";
import { sortFoodItem } from "../../util/sortFoodItem.ts";
import { ButtonContainer } from "../button/button-container/ButtonContainer.js";
import { Button } from "../button/button/Button.js";
import Modal from "../common/modal/Modal.js";
import FoodItem from "../food-item/FoodItem.ts";
import { deleteFoodItem, toggleFavoriteFoodItem } from "./FoodListManager.ts";

interface FoodListOptions {
  foodItems: FoodItemType[];
}

export default class FoodList {
  #originFoodItems;
  #foodItems;
  foodList;

  constructor({ foodItems }: FoodListOptions) {
    this.#originFoodItems = foodItems;
    this.#foodItems = foodItems;

    this.foodList = document.createElement("ul");
    this.foodList.className = "restaurant-list";

    this.updateSortItem("이름순");

    this.render();
  }

  get element() {
    return this.foodList;
  }

  render() {
    this.foodList.innerHTML = "";

    if (this.#foodItems.length === 0) {
      this.showEmptyListMessage();
    }

    const foodFragment = document.createDocumentFragment();

    this.#foodItems.forEach((foodItem: FoodItemType) => {
      const foodItemElement = new FoodItem({
        data: foodItem,
        cssType: "row",
        onFavoriteClick: (id: string) => this.updateFavoriteItem(id),
        onDeleteClick: (id: string) => this.updateDeleteItem(id),
        onFoodItemClick: () => this.renderDetailModal(foodItem),
      }).element;

      if (foodItemElement) {
        foodFragment.appendChild(foodItemElement);
      }
    });

    this.foodList.appendChild(foodFragment);
  }

  renderDetailModal(foodItem: FoodItemType) {
    const foodItemElement = document.querySelectorAll(".restaurant");
    if (!foodItemElement) return;

    foodItemElement.forEach((element) => {
      element.addEventListener("click", () => {
        const fragment = document.createDocumentFragment();

        const detailFoodItem = new FoodItem({
          data: foodItem,
          cssType: "column",
          onFavoriteClick: this.updateFavoriteItem.bind(this),
          onDeleteClick: this.updateDeleteItem.bind(this),
          onFoodItemClick: () => {},
        });
        if (!detailFoodItem.element) return;
        fragment.appendChild(detailFoodItem.element);

        const buttonContainer = ButtonContainer({
          buttons: [
            Button({
              name: "delete",
              innerText: "삭제하기",
              cssType: "secondary",
              onClick: () => {
                detailFoodItem.handleDeleteClick();
                detailModal.close();
              },
            }),
            Button({ name: "close", innerText: "닫기", onClick: () => detailModal.close() }),
          ],
        });
        fragment.appendChild(buttonContainer);

        const detailModal = new Modal({ content: fragment });
        detailModal.open();

        const body = document.querySelector("body");
        if (body) {
          body.appendChild(detailModal.element);
        }
      });
    });
  }

  showEmptyListMessage() {
    this.foodList.innerHTML = `
      <p class="empty-message">${EMPTY_LIST}</p>
    `;
  }

  updateFavoriteItem(id: string) {
    this.#foodItems = toggleFavoriteFoodItem(this.#foodItems, id);
    this.render();
  }

  updateDeleteItem(id: string) {
    this.#foodItems = deleteFoodItem(this.#foodItems, id);
    this.render();
  }

  updateFilterItem(category: string) {
    this.#foodItems = filterFoodItemsByCategory(category, this.#originFoodItems);
    this.render();
  }

  updateSortItem(sortType: string) {
    this.#foodItems = sortFoodItem(sortType, this.#foodItems);
    this.render();
  }
}

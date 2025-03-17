import { DELETE, EMPTY_LIST } from "../../constants/systemMessage.ts";
import { ButtonContainer } from "../button/button-container/ButtonContainer.js";
import { Button } from "../button/button/Button.js";
import Modal from "../common/modal/Modal.js";
import FoodItem from "../food-item/FoodItem.ts";
import FoodListManager from "./FoodListManager.ts";

interface FoodListOptions {
  foodItems: FoodItemType[];
}

export default class FoodList {
  foodListManager: FoodListManager;
  foodList: HTMLUListElement;

  constructor({ foodItems }: FoodListOptions) {
    this.foodListManager = new FoodListManager(foodItems);

    this.foodList = document.createElement("ul");
    this.foodList.className = "restaurant-list";

    this.updateSortItem("이름순");
  }

  get element() {
    return this.foodList;
  }

  render(foodItems = this.foodListManager.getItems()) {
    this.foodList.innerHTML = "";

    if (foodItems.length === 0) {
      this.showEmptyListMessage();
      return;
    }

    const foodFragment = document.createDocumentFragment();

    foodItems.forEach((foodItem: FoodItemType) => {
      const foodItemElement = new FoodItem({
        data: foodItem,
        cssType: "row",
        onFavoriteClick: (id: string) => {
          this.updateFavoriteItem(id);
        },
        onDeleteClick: (id: string) => {
          this.updateDeleteItem(id);
        },
        onFoodItemClick: (foodItem: FoodItemType) => {
          this.renderDetailModal(foodItem);
        },
      }).element;

      if (foodItemElement) {
        foodFragment.appendChild(foodItemElement);
      }
    });

    this.foodList.appendChild(foodFragment);
  }

  renderDetailModal(foodItem: FoodItemType) {
    const fragment = document.createDocumentFragment();

    const detailFoodItem = new FoodItem({
      data: foodItem,
      cssType: "column",
      onFavoriteClick: (id: string) => {
        this.updateFavoriteItem(id);
      },
      onDeleteClick: (id: string) => {
        this.updateDeleteItem(id);
        detailModal.close();
      },
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
            this.updateDeleteItem(foodItem.id);
            detailModal.close();
          },
        }),
        Button({ name: "close", innerText: "닫기", onClick: () => detailModal.close() }),
      ],
    });

    fragment.appendChild(buttonContainer);

    const detailModal = new Modal({ content: fragment });
    detailModal.open();

    document.body.appendChild(detailModal.element);
  }

  showEmptyListMessage() {
    this.foodList.innerHTML = `
      <p class="empty-message">${EMPTY_LIST}</p>
    `;
  }

  updateAddItem(foodItem: FoodItemType) {
    this.foodListManager.addItem(foodItem);
    this.render();
  }

  updateFavoriteItem(id: string) {
    this.foodListManager.toggleFavoriteFoodItem(id);
    this.render(this.foodListManager.processFoodItems());
  }

  updateDeleteItem(id: string) {
    if (confirm(DELETE)) {
      this.foodListManager.deleteFoodItem(id);
      this.render();
    }
  }

  updateFilterItem(category: string) {
    this.foodListManager.setFilterType(category);
    const filteredItems = this.foodListManager.processFoodItems();
    this.render(filteredItems);
  }

  updateSortItem(sortType: string) {
    this.foodListManager.setSortType(sortType);
    const sortedItems = this.foodListManager.processFoodItems();
    this.render(sortedItems);
  }

  updateFavoriteList(tabMenu: string) {
    this.foodListManager.setCurrentMenu(tabMenu);
    const favoriteItems = this.foodListManager.processFoodItems();
    this.render(favoriteItems);
  }
}

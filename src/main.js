import { FoodForm } from "./component/FoodForm.js";
import { FoodItem } from "./component/FoodItem.js";
import { FoodList } from "./component/FoodList.js";
import { HeaderComponent } from "./component/HeaderComponent.js";
import { Modal } from "./component/Modal.js";
import { foodItems } from "./mock/foodItems.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  FoodListPage();
  init();
});

function init() {
  document.querySelector(".gnb__button").addEventListener("click", () => {
    const modalOpen = document.querySelector(".modal--open");
    const modal = document.querySelector(".modal");
    if (modalOpen) {
      modal.classList.remove("modal--open");
    }
    modal.classList.add("modal--open");
  });

  document.querySelector(".modal-backdrop").addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("modal--open");
  });
}

import { FoodForm } from "../component/FoodForm.js";
import { FoodList } from "../component/FoodList.js";
import { HeaderComponent } from "../component/HeaderComponent.js";
import { Modal } from "../component/Modal.js";
import { foodItems } from "../mock/foodItems.js";

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));

  body.appendChild(foodList);
  Modal({ form: FoodForm() });
  init();
}

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

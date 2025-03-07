import { FoodForm } from "../component/FoodForm.js";
import { FoodList } from "../component/FoodList.js";
import { HeaderComponent } from "../component/HeaderComponent.js";
import { Modal } from "../component/Modal.js";
import { foodItems } from "../mock/mockItem.js";
import { modalClose, modalOpen } from "../util/modalAction.js";

function init() {
  document.querySelector(".modal-backdrop").addEventListener("click", () => {
    modalClose();
  });
}

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));

  body.appendChild(foodList);
  Modal({ form: FoodForm() });

  init();
}

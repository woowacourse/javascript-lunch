import { FoodForm } from "../component/FoodForm.js";
import { FoodList } from "../component/FoodList.js";
import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/Modal.js";
import { foodItems } from "../mock/mockItem.js";
import { modalClose, modalOpen } from "../util/modalAction.js";

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(Header({ title: "점심 뭐 먹지?" }));

  body.appendChild(foodList);
  Modal({ modalContent: FoodForm() });
}

import { FoodForm } from "../component/FoodForm.js";
import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/Modal.js";

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(Header({ title: "점심 뭐 먹지?" }));

  body.appendChild(foodList);
  Modal({ modalContent: FoodForm() });
}

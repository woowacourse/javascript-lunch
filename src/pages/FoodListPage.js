import { FoodForm } from "../component/FoodForm.js";
import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/modal/Modal.js";

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";

  const modal = new Modal({ title: "음식점 추가", content: FoodForm() });

  body.appendChild(
    Header({ title: "점심 뭐 먹지?", onAddClick: () => modal.open() })
  );
  body.appendChild(foodList);
}

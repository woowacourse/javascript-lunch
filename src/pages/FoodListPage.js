import FoodForm from "../component/FoodForm.js";
import { FoodItem } from "../component/FoodItem.js";
import FoodList from "../component/FoodList.js";
import { Header } from "../component/layout/Header.js";
import Modal from "../component/layout/modal/Modal.js";
import { foodItems } from "../mock/mockItem.js";

export function FoodListPage() {
  const body = document.querySelector("body");
  body.innerHTML = "";

  const modal = new Modal({
    title: "음식점 추가",
    content: new FoodForm().element,
  });

  body.appendChild(
    Header({ title: "점심 뭐 먹지?", onAddClick: () => modal.open() })
  );

  body.appendChild(new FoodList({ foodItems: foodItems }).element);
}

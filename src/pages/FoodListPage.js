import FoodForm from "../component/FoodForm.js";
import { FoodItem } from "../component/FoodItem.js";
import FoodList from "../component/FoodList.js";
import { Header } from "../component/layout/Header.js";
import Modal from "../component/layout/modal/Modal.js";

export function FoodListPage() {
  const body = document.querySelector("body");
  body.innerHTML = "";

  body.appendChild(
    Header({ title: "점심 뭐 먹지?", onAddClick: () => modal.open() })
  );

  const foodItems = JSON.parse(localStorage.getItem("foodItem")) || [];

  const foodList = new FoodList({ foodItems: foodItems });
  body.appendChild(foodList.element);

  const modal = new Modal({
    content: new FoodForm({
      onSubmit: (formData) => {
        foodList.addItem(formData);
        modal.close();
      },
    }).element,
  });
}

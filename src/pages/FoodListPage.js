import FoodForm from "../component/FoodForm.js";
import FoodList from "../component/FoodList.js";
import { Header } from "../component/layout/Header.js";
import Modal from "../component/layout/modal/Modal.js";
import { getStoredFoodItems } from "../managers/storageManagers.ts";

export function FoodListPage() {
  const body = document.querySelector("body");
  body.innerHTML = "";

  const modal = new Modal({
    content: new FoodForm({
      onSubmit: (formData) => {
        foodList.addItem(formData);
        modal.close();
      },
    }).element,
  });

  body.appendChild(
    Header({ title: "점심 뭐 먹지?", onAddClick: () => modal.open() }),
  );

  const foodItems = getStoredFoodItems();
  console.log(foodItems);

  const foodList = new FoodList({ foodItems: foodItems });
  body.appendChild(foodList.element);
}

import { FoodForm } from "../component/FoodForm.js";
import { FoodList } from "../component/FoodList.js";
import { HeaderComponent } from "../component/HeaderComponent.js";
import { Modal } from "../component/Modal.js";
import { foodItems } from "../mock/foodItems.js";

export function FoodListPage() {
  const body = document.querySelector("body");
  body.appendChild(HeaderComponent({ title: "점심 뭐 먹지?" }));

  body.appendChild(FoodList({ foodItems: foodItems }));
  Modal({ form: FoodForm() });
}

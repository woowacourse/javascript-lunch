import { IconButton } from "../component/button/IconButton.js";
import { FoodForm } from "../component/FoodForm.js";
import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/Modal.js";

export function FoodListPage(foodList) {
  const body = document.querySelector("body");
  body.innerHTML = "";

  const addFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: Modal.open,
  });

  body.appendChild(Header({ title: "점심 뭐 먹지?", icon: addFoodItemIcon }));

  body.appendChild(foodList);
  const modal = new Modal(FoodForm());
}

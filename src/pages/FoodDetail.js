import { Button } from "../component/button/Button";
import { ButtonContainer } from "../component/button/ButtonContainer";
import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import { deleteFoodItem } from "../domain/handler/FoodItemHandler";

export function FoodDetail(filter, foodItem, modal) {
  const { imgSrc, imgAlt, name, distance, description, link, favorite } =
    foodItem;
  const container = document.createElement("div");

  const foodDetailInfo = FoodItem(foodItem);
  foodDetailInfo.style.flexDirection = "column";
  foodDetailInfo.style.gap = "16px";
  container.appendChild(foodDetailInfo);

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "삭제하기",
          onClick: () => deleteFoodItem(filter, foodItem, modal),
        }),
        Button({
          cssType: "primary",
          innerText: "닫기",
          onClick: Modal.close,
        }),
      ],
    })
  );

  return container;
  s;
}

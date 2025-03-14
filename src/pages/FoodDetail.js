import { Button } from "../component/button/Button";
import { ButtonContainer } from "../component/button/ButtonContainer";
import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import {
  deleteFoodItem,
  readFoodList,
} from "../domain/handler/FoodItemHandler";
import { updateStorageFoodList } from "../domain/handler/FoodStorageHandler";

export function FoodDetail(filter, foodDetailItem, modal) {
  const { imgSrc, imgAlt, name, distance, description, link, favorite } =
    foodDetailItem;
  const container = document.createElement("div");

  const foodDetailInfo = FoodItem(
    foodDetailItem,
    () => {},
    (event, foodItem) =>
      handleFavoriteButton(event, foodItem, filter, modal, favorite)
  );
  foodDetailInfo.style.flexDirection = "column";
  foodDetailInfo.style.gap = "16px";
  container.appendChild(foodDetailInfo);

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "삭제하기",
          onClick: () => deleteFoodItem(filter, foodDetailItem, modal),
        }),
        Button({
          cssType: "primary",
          innerText: "닫기",
          onClick: () => closeButton(filter, modal),
        }),
      ],
    })
  );

  return container;
}

function closeButton(filter, modal) {
  const favoriteState = document.querySelector(
    ".tab-button_favorite.selected-button"
  );
  if (favoriteState) {
    readFoodList(filter, modal, true);
  } else readFoodList(filter, modal);

  Modal.close();
}

function handleFavoriteButton(event, foodItem, filter, modal) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateStorageFoodList(foodItem);

  modal.setModalContent(FoodDetail(filter, foodItem, modal), filter, modal);
}

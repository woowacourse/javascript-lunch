import { Button } from "../component/button/Button";
import { ButtonContainer } from "../component/button/ButtonContainer";
import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import {
  convertStorageToLocal,
  deleteFoodItem,
  readFoodList,
  sortedFoodList,
} from "../domain/handler/FoodItemHandler";
import { updateStorageFoodList } from "../domain/handler/FoodStorageHandler";
import { HandleFavoriteButtonType } from "../types/domain/FoodItemHandlerType";
import { CloseButtonType, FoodDetailType } from "../types/pages/FoodDetailType";

export function FoodDetail({ filter, foodDetailItem }: FoodDetailType) {
  const container = document.createElement("div");

  const foodDetailInfo = FoodItem({
    foodItem: foodDetailItem,
    handleModal: () => {},
    handleFavoriteButton: (event, foodItem) =>
      handleFavoriteButton({ event, foodItem, filter }),
  });
  const linkCompennt = document.createElement("div");
  linkCompennt.innerHTML = foodDetailItem.link;

  foodDetailInfo.appendChild(linkCompennt);

  foodDetailInfo.style.flexDirection = "column";
  foodDetailInfo.style.gap = "16px";
  container.appendChild(foodDetailInfo);

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "삭제하기",
          onClick: () =>
            deleteFoodItem({ filter, newFoodItem: foodDetailItem }),
        }),
        Button({
          cssType: "primary",
          innerText: "닫기",
          onClick: () => closeButton({ filter }),
        }),
      ],
    })
  );

  return container;
}

function closeButton({ filter }: CloseButtonType) {
  const favoriteState = document.querySelector(
    ".tab-button_favorite.selected-button"
  );
  if (favoriteState) {
    const previousFoodList = readFoodList({ favoriteFilter: true });
    convertStorageToLocal({
      filter,
      foodList: sortedFoodList({ filter, foodList: previousFoodList }),
    });
  } else {
    const previousFoodList = readFoodList({ favoriteFilter: false });
    convertStorageToLocal({
      filter,
      foodList: sortedFoodList({ filter, foodList: previousFoodList }),
    });
  }

  Modal.close({ filter: null });
}

function handleFavoriteButton({ foodItem, filter }: HandleFavoriteButtonType) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateStorageFoodList({ newFoodItem: foodItem });

  Modal.setContent({
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem }),
  });
}

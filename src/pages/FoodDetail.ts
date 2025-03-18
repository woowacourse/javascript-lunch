import { Button } from "../component/button/Button";
import { ButtonContainer } from "../component/button/ButtonContainer";
import { FoodItem } from "../component/FoodItem";
import { Modal } from "../component/layout/Modal";
import { deleteFoodItem, updateFoodList } from "../domain/FoodService";
import { ChangeFavoriteStatusType } from "../types/domain/TabButtonHandlerType";
import { FoodDetailType } from "../types/pages/FoodDetailType";

export function FoodDetail({ filter, foodDetailItem }: FoodDetailType) {
  const container = document.createElement("div");

  const foodDetailInfo = FoodItem({
    foodItem: foodDetailItem,
    handleModal: () => {},
    handleTabButton: (event, foodItem) =>
      changeFavoriteStatus({ event, foodItem, filter }),
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
          onClick: () => Modal.close({ filter }),
        }),
      ],
    })
  );

  return container;
}

function changeFavoriteStatus({ foodItem, filter }: ChangeFavoriteStatusType) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });

  Modal.setContent({
    filter,
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem }),
  });
}

import { Button } from "../../component/button/Button";
import { ButtonContainer } from "../../component/button/ButtonContainer";
import { FoodItem } from "../../component/FoodItem";
import { Modal } from "../../component/layout/Modal";
import { deleteFoodItem, updateFoodList } from "../service/FoodService";
import { ToggleStatusType } from "../../types/domain/FavoriteFilterType";
import { LoadFoodDetailType } from "../../types/domain/LoadFoodDetailType";

export function loadFoodDetail({ foodDetailItem }: LoadFoodDetailType) {
  const container = document.createElement("div");

  const foodDetailInfo = FoodItem({
    foodItem: foodDetailItem,
    handleModal: () => {},
    handleTabButton: (event, foodItem) => toggleStatus({ event, foodItem }),
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
          onClick: () => deleteFoodItem({ newFoodItem: foodDetailItem }),
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
}

function toggleStatus({ foodItem }: ToggleStatusType) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });

  Modal.setContent({
    modalContent: loadFoodDetail({ foodDetailItem: foodItem }),
  });
}

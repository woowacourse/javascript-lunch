import createElement from "../../util/createElement";
import closeModal from "../../util/closeModal";
import Button from "../util/Button";
import restaurantDataList from "../../domain/RestaurantDataList";

export default function RestaurantItemDetailModalButtonContainer({
  restaurantId,
}) {
  const $div = createElement({
    tag: "div",
    classNames: ["button-container"],
  });

  $div.appendChild(
    Button({
      variant: "secondary",
      type: "button",
      text: "삭제하기",
      onClick: () => deleteItemButton(restaurantId),
    })
  );
  $div.appendChild(
    Button({
      variant: "primary",
      type: "submit",
      text: "닫기",
      onClick: closeModal,
    })
  );

  return $div;
}

function deleteItemButton(restaurantId) {
  restaurantDataList.deleteDataList(restaurantId);
  closeModal();
}

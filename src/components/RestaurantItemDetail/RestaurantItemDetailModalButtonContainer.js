import createElement from "../../util/createElement";
import closeModal from "../../util/closeModal";
import Button from "../util/Button";

export default function RestaurantItemDetailModalButtonContainer() {
  const $div = createElement({
    tag: "div",
    classNames: ["button-container"],
  });

  $div.appendChild(
    Button({
      variant: "secondary",
      type: "button",
      text: "삭제하기",
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

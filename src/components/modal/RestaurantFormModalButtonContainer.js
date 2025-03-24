import createElement from "../../util/createElement";
import closeModal from "./util/closeModal";
import Button from "../util/Button";

export default function RestaurantFormModalButtonContainer() {
  const $div = createElement({
    tag: "div",
    classNames: ["button-container"],
  });

  $div.appendChild(
    Button({
      variant: "secondary",
      type: "button",
      text: "취소하기",
      onClick: closeModal,
    })
  );
  $div.appendChild(
    Button({
      variant: "primary",
      type: "submit",
      text: "추가하기",
    })
  );

  return $div;
}

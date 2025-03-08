import createElement from "../../util/createElement";
import Button from "../util/Button";
import { $ } from "../../util/querySelector";
import { removeModal } from "../util/Modal";

export default function RestaurantModalButtonContainer() {
  const $div = createElement({
    tag: "div",
    classNames: ["button-container"],
  });

  $div.appendChild(
    Button({
      className: "button--cancel",
      variant: "secondary",
      type: "button",
      text: "취소하기",
      onClick: removeModal,
    })
  );
  $div.appendChild(
    Button({
      className: "button--add",
      variant: "primary",
      type: "submit",
      text: "추가하기",
    })
  );

  return $div;
}

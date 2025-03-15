import createElement from "../../../util/createElement";
import Button from "../../common/Button";
import { removeModal } from "../Modal";

export default function RestaurantAddModalButtonContainer() {
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

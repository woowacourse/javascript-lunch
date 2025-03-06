import createElement from "../util/createElement";
import Button from "./util/Button";

export default function RestaurantModalButtonContainer() {
  const $div = createElement({
    tag: "div",
    classNames: ["button-container"],
  });

  $div.appendChild(
    Button({
      variant: "secondary",
      type: "button",
      text: "취소하기",
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

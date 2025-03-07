import createElement from "../../util/createElement";
import Button from "../util/Button";
import reset from "../../util/reset";
import restaurantDataList from "../../domain/RestaurantDataList";
import Restaurant from "../restaurant/Restaurant";
import { init } from "../../main";

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
      onClick: handleClickCancel,
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

function handleClickCancel() {
  document.querySelector(".modal").remove();
}

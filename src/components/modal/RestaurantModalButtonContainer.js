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

  function handleClickCancel() {
    document.querySelector(".modal").remove();
  }

  function handleClickAdd(event) {
    event.preventDefault();
    const $form = document.querySelector(".form");
    const data = Object.fromEntries(new FormData($form));
    restaurantDataList.addData(data);
    reset();
    init();
  }

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
      // onClick: handleClickAdd,
    })
  );

  return $div;
}

import { restaurants } from "../constants/restaurantData";
import restaurantList from "./restaurantList";
import { $ } from "../utils/domHelpers";
import button from "../components/@common/button.js";

const buttonContainer = () => {
  const buttonContainer = $(".button-container");
  buttonContainer.innerHTML = `
      ${button({
        type: "button",
        id: "cancel-button",
        className: "secondary",
        children: "취소하기",
      })}
      ${button({
        type: "button",
        id: "add-button",
        className: "primary",
        children: "추가하기",
      })}
    
  `;

  const $addButton = $("#add-button");
  const $cancelButton = $("#cancel-button");

  $addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const $category = $("#category");
    const $name = $("#name");
    const $distance = $("#distance");
    const $description = $("#description");
    const $link = $("#link");

    const newRestaurant = {
      category: $category.value,
      title: $name.value,
      distance: $distance.value,
      description: $description.value,
      link: $link.value,
    };

    restaurants.push(newRestaurant);
    //TODO: 모달 닫기 로직 추가
    restaurantList();
  });
};

export default buttonContainer;

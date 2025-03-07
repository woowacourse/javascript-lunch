import { restaurants } from "../constants/restaurantData";
import { $ } from "../utils/domHelpers";
import restaurantList from "../views/mainPage/components/restaurantList";
import { ERROR } from "../constants/messages";

const buttonHandler = (event) => {
  event.preventDefault();

  const $form = event.target.closest("form");
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

  if (
    !newRestaurant.category ||
    !newRestaurant.title ||
    !newRestaurant.distance
  ) {
    alert(ERROR.INVALID_INPUT_REQUIRED);
    return;
  }

  restaurants.push(newRestaurant);

  const $restaurantModal = $("#restaurant-modal");
  $restaurantModal.classList.remove("modal--open");

  $form.reset();

  restaurantList();
};

export default buttonHandler;

import { restaurants } from "../constants/restaurantData";
import { $ } from "../utils/domHelpers";
import restaurantList from "../views/mainPage/components/restaurantList";

const buttonHandler = (event) => {
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

  if (
    !newRestaurant.category ||
    !newRestaurant.title ||
    !newRestaurant.distance
  ) {
    alert("필수 입력 항목을 모두 작성해주세요.");
    return;
  }

  restaurants.push(newRestaurant);
  const $restaurantModal = $("#restaurant-modal");
  $restaurantModal.classList.remove("modal--open");
  restaurantList();
};

export default buttonHandler;

import { $ } from "./utils/domHelpers.js";
import restaurantList from "./views/restaurantList.js";
import { restaurants } from "./constants/restaurantData.js";

const $app = $("#app");

$app.append(restaurantList());

const $modalOpenButton = $(".gnb__button");
const $modalContainer = $("#restaurant-modal");
const $closeButton = $(".button--secondary");
const $modalBackdrop = $(".modal-backdrop");
const $addButton = $("#add-button");

const toggleModal = () => {
  $modalContainer.classList.toggle("modal--open");
};

$modalOpenButton.addEventListener("click", toggleModal);
$closeButton.addEventListener("click", toggleModal);
$modalBackdrop.addEventListener("click", toggleModal);
$addButton.addEventListener("click", toggleModal);

const $category = $("#category");
const $name = $("#name");
const $distance = $("#distance");
const $description = $("#description");
const $link = $("#link");

$addButton.addEventListener("click", (event) => {
  event.preventDefault();

  const newRestaurant = {
    category: $category.value,
    title: $name.value,
    distance: $distance.value,
    description: $description.value,
    link: $link.value,
  };

  restaurants.push(newRestaurant);
  restaurantList();
});

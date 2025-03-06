import { $ } from "./utils/domHelpers.js";
import restaurantList from "./views/restaurantList.js";
import { restaurants } from "./constants/restaurantData.js";
import buttonContainer from "./views/buttonContainer.js";
import nameInput from "./views/nameInput";
import linkInput from "./views/linkInput";
import distanceSelect from "./views/distanceSelect.js";
import categorySelect from "./views/categorySelect.js";

restaurantList();
buttonContainer();
nameInput();
linkInput();
distanceSelect();
categorySelect();

const $modalOpenButton = $(".gnb__button");
const $modalContainer = $("#restaurant-modal");
const $closeButton = $(".button--secondary");
const $modalBackdrop = $(".modal-backdrop");

const toggleModal = () => {
  $modalContainer.classList.toggle("modal--open");
};

$modalOpenButton.addEventListener("click", toggleModal);
$closeButton.addEventListener("click", toggleModal);
$modalBackdrop.addEventListener("click", toggleModal);
// $addButton.addEventListener("click", toggleModal);

// const $category = $("#category");
// const $name = $("#name");
// const $distance = $("#distance");
// const $description = $("#description");
// const $link = $("#link");

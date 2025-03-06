import { $ } from "./utils/domHelpers.js";
import restaurantList from "./views/restaurantList.js";
import { restaurants } from "./constants/restaurantData.js";
import buttonContainer from "./views/buttonContainer.js";
import nameInput from "./views/nameInput";
import linkInput from "./views/linkInput";
import distanceSelect from "./views/distanceSelect.js";
import categorySelect from "./views/categorySelect.js";
import description from "./views/description.js";

restaurantList();
buttonContainer();
nameInput();
linkInput();
distanceSelect();
categorySelect();
description();

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

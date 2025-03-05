import { $ } from "./utils/domHelpers.js";
import restaurantList from "./views/restaurantList.js";

const app = $("#app");

app.append(restaurantList());

const modalOpenButton = $(".gnb__button");
const modalContainer = $("#restaurant-modal");
const closeButton = $(".button--secondary");
const modalBackdrop = $(".modal-backdrop");

const toggleModal = () => {
  modalContainer.classList.toggle("modal--open");
};

modalOpenButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
modalBackdrop.addEventListener("click", toggleModal);

import Restaurant from "./components/Restaurant.js";
import RestaurantModal from "./components/RestaurantModal.js";
import Modal from "./components/Modal.js";

window.addEventListener("load", () => {
  const $button = document.querySelector(".gnb__button");
  $button.addEventListener("click", () => {
    const $modal = document.querySelector(".modal");
    $modal?.classList.add("modal--open");
  });
});

function init() {
  Restaurant();
  Modal(RestaurantModal);
}

init();

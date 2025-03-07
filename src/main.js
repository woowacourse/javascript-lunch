import Restaurant from "./components/restaurant/Restaurant.js";
import RestaurantModal from "./components/modal/RestaurantModal.js";
import Modal from "./components/util/Modal.js";

window.addEventListener("load", () => {
  init();
});

export function init() {
  Restaurant();
  event();
}

function event() {
  const $button = document.querySelector(".gnb__button");
  $button.addEventListener("click", () => {
    Modal(RestaurantModal);
  });
}

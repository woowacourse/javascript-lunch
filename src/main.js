import Restaurant from "./components/restaurant/Restaurant.js";
import RestaurantFormModal from "./components/modal/RestaurantFormModal.js";
import Modal from "./components/util/Modal.js";

window.addEventListener("load", () => {
  init();
});

export function init() {
  Restaurant({
    isReRender: false
  });
  event();
}

function event() {
  const $button = document.querySelector(".gnb__button");
  $button.addEventListener("click", () => {
    Modal(RestaurantFormModal);
  });

  const $restaurant = document.querySelector(".restaurant");
  $restaurant.addEventListener("click", () => {
    Modal();
  })
}
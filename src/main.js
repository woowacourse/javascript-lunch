import Header from "./Header";
import Restaurant from "./Restaurant";
import Modal from "./Modal";
import RestaurantList from "./RestaurantList";

addEventListener("load", () => {
  const $app = document.querySelector("#app");
  const header = new Header({ title: "오늘 뭐 먹지" });
  $app.appendChild(header.render());

  const restaurantList = new RestaurantList();
  $app.appendChild(restaurantList.render());

  const modal = new Modal({ modalTitle: "새로운 음식점" });
  $app.appendChild(modal.element);
  // modal.onRender();

  //

  // const $addRestaurantButton = document.querySelector(".gnb__button");
  // const $modal = document.querySelector(".modal");
  // const $modalCancelButton = document.querySelector("#modal-cancel");
  // console.log({ $addRestaurantButton, $modalCancelButton });
  // $addRestaurantButton.addEventListener("click", function () {
  //   $modal.classList.remove("hidden");
  // });
  // $modalCancelButton.addEventListener("click", function () {
  //   $modal.classList.add("hidden");
  // });
});

import Header from "./Header";
import Restaurant from "./Restaurant";
import RestaurantList from "./RestaurantList";

addEventListener("load", () => {
  const $app = document.querySelector("#app");
  const header = new Header({ title: "오늘 뭐 먹지" });
  $app.appendChild(header.render());

  const restaurantList = new RestaurantList();
  $app.appendChild(restaurantList.render());

  // const $addRestaurantButton = document.querySelector(".gnb__button");
  // const $modal = document.querySelector(".modal");
  // const $modalCancelButton = document.querySelector("#modal-cancel");

  // $addRestaurantButton.addEventListener("click", function () {
  //   $modal.classList.remove("hidden");
  // });

  // $modalCancelButton.addEventListener("click", function () {
  //   $modal.classList.add("hidden");
  // });
});

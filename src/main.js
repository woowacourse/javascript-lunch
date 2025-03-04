addEventListener("load", () => {
  const app = document.querySelector("#app");

  const $addRestaurantButton = document.querySelector(".gnb__button");
  const $modal = document.querySelector(".modal");
  const $modalCancelButton = document.querySelector("#modal-cancel");

  $addRestaurantButton.addEventListener("click", function () {
    $modal.classList.remove("hidden");
  });

  $modalCancelButton.addEventListener("click", function () {
    $modal.classList.add("hidden");
  });
});

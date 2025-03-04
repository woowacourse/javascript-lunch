import Restaurant from "./components/Restaurant";

window.addEventListener("load", () => {
  const $button = document.querySelector(".gnb__button");
  $button.addEventListener("click", () => {
    const $modal = document.querySelector(".modal");
    $modal?.classList.add("modal--open");
  });
});

function init() {
  Restaurant();
}

init();

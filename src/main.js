window.addEventListener("load", () => {
  const $button = document.querySelector(".gnb__button");
  $button.addEventListener("click", () => {
    const $modal = document.querySelector(".modal");
    $modal?.classList.add("modal--open");
  });
});

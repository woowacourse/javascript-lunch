export function modalOpen() {
  const modal = document.querySelector(".modal");
  modal.classList.add("modal--open");
}

export function modalClose() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("modal--open");
}

import App from "./App";

export const setModalToggleHandler = (
  openModal: () => void,
  closeModal: () => void
) => {
  const $modalOpenButton = document.querySelector(".gnb__button");
  const $modalBackdrop = document.querySelector(".modal-backdrop");
  const $modalCloseButton = document.querySelector(".button--secondary");

  $modalOpenButton?.addEventListener("click", openModal);

  $modalBackdrop?.addEventListener("click", closeModal);
  $modalCloseButton?.addEventListener("click", closeModal);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") closeModal();
  });
};

export const setSortingSelectChangeHandler = (
  sortRestaurantList: () => void
) => {
  const $sortingSelect = document.querySelector("#sorting-filter");

  $sortingSelect?.addEventListener("change", sortRestaurantList);
};

export const setFilteringSelectChangeHandler = (
  filterRestaurantList: () => void
) => {
  const $filteringSelect = document.querySelector("#category-filter");

  $filteringSelect?.addEventListener("change", filterRestaurantList);
};

export const setAddNewRestaurantHandler = (addNewRestaurant: () => void) => {
  const $form = document.querySelector(".modal-container form");

  $form?.addEventListener("submit", addNewRestaurant);
};

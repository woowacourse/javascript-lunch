export const setModalToggleHandler = (
  openModal: () => void,
  closeModal: () => void
) => {
  const $modalOpenButton = document.querySelector(".gnb__button");
  const $modalCloseButton = document.querySelector(".button--secondary");

  $modalOpenButton?.addEventListener("click", openModal);

  $modalCloseButton?.addEventListener("click", closeModal);
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

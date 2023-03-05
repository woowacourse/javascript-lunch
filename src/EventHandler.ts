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

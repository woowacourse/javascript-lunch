import Tab from "./tab";

const FavoriteTabFilters = () => {
  const filters = document.createElement("div");
  filters.classList.add("favorite-filter-container");

  filters.appendChild(Tab({ text: "모든 음식점", active: true }));
  filters.appendChild(Tab({ text: "자주 가는 음식점" }));

  return filters;
};
export default FavoriteTabFilters;

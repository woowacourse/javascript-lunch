import Tab from "./tab";

const FavoriteTabFilters = ({ onSortByFavorite }) => {
  const filters = document.createElement("div");
  filters.classList.add("favorite-filter-container");

  filters.appendChild(
    Tab({
      text: "모든 음식점",
      id: "favorite-all",
      active: true,
      changeState: () => onSortByFavorite(false),
    })
  );
  filters.appendChild(
    Tab({
      text: "자주 가는 음식점",
      id: "favorite",
      changeState: () => onSortByFavorite(true),
    })
  );

  return filters;
};
export default FavoriteTabFilters;

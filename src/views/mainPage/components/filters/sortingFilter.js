import select from "../../../../components/@common/select";
import { SORTING_FILTER_OPTIONS } from "../../../../constants/options";
import { $ } from "../../../../utils/domHelpers";
import updateRestaurantList from "../display/restaurantList";

const sortingFilter = () => {
  const existingSelect = $("#sorting-filter");
  if (existingSelect) {
    existingSelect.remove();
  }

  const $sortingSelect = select({
    options: SORTING_FILTER_OPTIONS,
    id: "sorting-filter",
  });

  $sortingSelect.addEventListener("change", (event) => {
    const isFavoriteTab = $(".favorite-restaurant-tab").classList.contains(
      "select-tab-button"
    );
    updateRestaurantList(isFavoriteTab);
  });

  return $sortingSelect;
};

export default sortingFilter;

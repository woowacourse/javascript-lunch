import restaurantDataList from "../../domain/RestaurantDataList.ts";
import createElement from "../../util/createElement";
import Select from "../common/Select";

export default function RestaurantFilters() {
  const $filterContainer = createElement({
    tag: "section",
    classNames: ["restaurant-filter-container"],
  });

  const $categoryFilter = Select({
    name: "category",
    id: "category-filter",
    classNames: ["restaurant-filter"],
    options: ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"],
    isDefaultOption: false,
  });

  const $sortingFilter = Select({
    name: "sorting",
    id: "sorting-filter",
    classNames: ["restaurant-filter"],
    options: ["이름순", "거리순"],
    values: ["name", "distance"],
    isDefaultOption: false,
  });

  $categoryFilter.addEventListener("change", (event) =>
    handleSelectionChange(event, true)
  );
  $sortingFilter.addEventListener("change", (event) =>
    handleSelectionChange(event, false)
  );

  $filterContainer.append($categoryFilter, $sortingFilter);

  return $filterContainer;
}

function handleSelectionChange(event, isCategory) {
  const selectedValue = event.target.value;
  if (isCategory) {
    restaurantDataList.setCategory(selectedValue);
  } else {
    restaurantDataList.setSortedFlag(selectedValue);
  }
  restaurantDataList.renderRestaurantList();
}

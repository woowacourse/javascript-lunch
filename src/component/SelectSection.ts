import { createElement } from "../utils/Dom";

const $selectSection = createElement("section");
$selectSection.className = "restaurant-filter-container";

const $selectCategory = createElement("select");
$selectCategory.className = "restaurant-filter";
$selectCategory.setAttribute("name", "category");
$selectCategory.id = "category-filter";

const categories = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];
categories.forEach((category) => {
  const $option = createElement("option");
  $option.setAttribute("value", category);
  $option.textContent = category;
  $selectCategory.append($option);
});

const $selectSorting = createElement("select");
$selectSorting.className = "restaurant-filter";
$selectSorting.setAttribute("name", "sorting");
$selectSorting.id = "sorting-filter";

const $sorts = ["이름순", "거리순"];
$sorts.forEach((sort) => {
  const $option = createElement("option");
  $option.setAttribute("value", sort);
  $option.textContent = sort;
  $selectSorting.append($option);
});

$selectSection.append($selectCategory, $selectSorting);

export default $selectSection;

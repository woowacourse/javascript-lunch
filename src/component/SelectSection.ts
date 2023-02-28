import { createElement } from "../utils/Dom";
import { CategoryName, OptionValue } from "../constant/Constants";

const $selectSection = createElement("section");
$selectSection.className = "restaurant-filter-container";

const $selectCategory = createElement("select");
$selectCategory.className = "restaurant-filter";
$selectCategory.setAttribute("name", "category");
$selectCategory.id = "category-filter";

const categories = [
  OptionValue.TOTAL,
  CategoryName.KOREAN,
  CategoryName.CHINESE,
  CategoryName.JAPANESE,
  CategoryName.WESTERN,
  CategoryName.ASIAN,
  CategoryName.OTHER,
];
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

const $sorts = [OptionValue.NAME_ORDER, OptionValue.TAKING_TIME_ORDER];
$sorts.forEach((sort) => {
  const $option = createElement("option");
  $option.setAttribute("value", sort);
  $option.textContent = sort;
  $selectSorting.append($option);
});

$selectSection.append($selectCategory, $selectSorting);

export default $selectSection;

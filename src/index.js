import "../templates/style.css";
import "./image/add-button.png";

import { CATEGORY_WITH_ENTIRE, SORT_STANDARD } from "./constants/selectOptions";

import AddRestaurantModal from "./view/components/AddRestaurantModal";
import AllRestaurantList from "./domain/AllRestaurantList";
import generateSelectBox from "./view/generateComponent/generateSelectBox";
import getLocalStorageItem from "./utils/getLocalStorageItem";
import renderRestaurantItem from "./view/renderRestaurantItem";
import { restaurantData } from "./data/restaurantData";
import setLocalStorageItem from "./utils/setLocalStorageItem";

const main = document.getElementById("main");
const modal = new AddRestaurantModal();
main.append(modal.element);

const filterContainer = document.getElementById("filter-container");
const categorySelectBox = generateSelectBox(CATEGORY_WITH_ENTIRE);
const sortStandardSelectBox = generateSelectBox(SORT_STANDARD);
filterContainer.append(categorySelectBox, sortStandardSelectBox);

const openButton = document.getElementById("add-restaurant-button");

const restaurants = getLocalStorageItem("allRestaurants", restaurantData);

AllRestaurantList.init(restaurants ?? []);

renderRestaurantItem({
  restaurantList: AllRestaurantList,
  category: CATEGORY_WITH_ENTIRE[0],
  sortStandard: SORT_STANDARD[0],
});

openButton.addEventListener("click", () => {
  modal.open();
});

filterContainer.addEventListener("change", () => {
  renderRestaurantItem({
    restaurantList: AllRestaurantList,
    category: categorySelectBox.value,
    sortStandard: sortStandardSelectBox.value,
  });
});

main.addEventListener("submit", (e) => {
  e.preventDefault();

  renderRestaurantItem({
    restaurantList: AllRestaurantList,
    category: categorySelectBox.value,
    sortStandard: sortStandardSelectBox.value,
  });

  modal.hide();

  setLocalStorageItem("allRestaurants", AllRestaurantList.getRestaurants());
});

import "../templates/style.css";
import "./image/add-button.png";
import generateSelectBox from "./view/generateComponent/generateSelectBox";
import RestaurantList from "./domain/RestaurantList";
import { restaurantData } from "./data/restaurantData";
import AddRestaurantModal from "./view/components/AddRestaurantModal";
import renderRestaurantItem from "./view/renderRestaurantItem";
import getLocalStorageItem from "./utils/getLocalStorageItem";
import { CATEGORY_WITH_ENTIRE, SORT_STANDARD } from "./constants/selectOptions";

const restaurants = getLocalStorageItem("restaurants", restaurantData);

RestaurantList.init(restaurants ?? []);

const main = document.getElementById("main");

const filterContainer = document.getElementById("filter-container");
const categorySelectBox = generateSelectBox(CATEGORY_WITH_ENTIRE);
const sortStandardSelectBox = generateSelectBox(SORT_STANDARD);

filterContainer.append(categorySelectBox, sortStandardSelectBox);

filterContainer.addEventListener("change", () => {
  renderRestaurantItem({
    category: categorySelectBox.value,
    sortStandard: sortStandardSelectBox.value,
  });
});

renderRestaurantItem({
  category: CATEGORY_WITH_ENTIRE[0],
  sortStandard: SORT_STANDARD[0],
});

const modal = new AddRestaurantModal();

main.append(modal.element);

main.addEventListener("submit", (e) => {
  e.preventDefault();
  renderRestaurantItem({
    category: categorySelectBox.value,
    sortStandard: sortStandardSelectBox.value,
  });
  modal.hide();

  const stringifiedRestaurants = JSON.stringify(
    RestaurantList.getRestaurants()
  );
  localStorage.setItem("restaurants", stringifiedRestaurants);
});

const openButton = document.getElementById("add-restaurant-button");

openButton.addEventListener("click", () => {
  modal.open();
});

import "./resources.js";
import { RESTAURANTS_SAMPLE } from "./constants.ts";
import { createHeader } from "./components/Header.ts";
import AddingRestaurantModal from "./components/AddingRestaurantModal.ts";
import { createRestaurantItem } from "./components/ResetaurantItem.ts";
import RestaurantDetailModal from "./components/RestaurantDetailModal.ts";

// 1. 컴포넌트를 따로 만든다

const addingRestaurantModal = new AddingRestaurantModal();
const restaurantDetailModal = new RestaurantDetailModal();

const header = createHeader({
  title: "점심 뭐 먹니?",
  imageSource: "./add-button.png",
  onButtonClick: () => addingRestaurantModal.toggle(),
});

const restaurantList = document.createElement("ul");
restaurantList.classList.add("restaurant-list");

const categoryDropdown = document.createElement("select");
categoryDropdown.classList.add("restaurant-filter");
categoryDropdown.setAttribute("name", "category");
categoryDropdown.setAttribute("id", "category-filter");

const categoryOptions = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
].map((category) => {
  const option = document.createElement("option");
  option.textContent = category;
  return option;
});
categoryOptions.forEach((option) => {
  categoryDropdown.appendChild(option);
});

// 2. 컴포넌트를 결합한다
const restaurantItems = RESTAURANTS_SAMPLE.map((restaurantItem) =>
  createRestaurantItem({
    restaurant: restaurantItem,
    onClick: () => {
      restaurantDetailModal.restaurant = restaurantItem;
      restaurantDetailModal.toggle();
    },
  })
);
restaurantItems.forEach((child) => restaurantList.appendChild(child));

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
container.appendChild(categoryDropdown);
container.appendChild(restaurantList);
container.appendChild(addingRestaurantModal.element);
container.appendChild(restaurantDetailModal.element);

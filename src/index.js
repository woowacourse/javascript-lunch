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
container.appendChild(restaurantList);
container.appendChild(addingRestaurantModal.element);
container.appendChild(restaurantDetailModal.element);

import "./resources.js";
import { createHeader } from "./components/Header.ts";
import AddingRestaurantModal from "./components/AddingRestaurantModal.ts";
import { createRestaurantItem } from "./components/ResetaurantItem.ts";

// 1. 컴포넌트를 따로 만든다

const addingRestaurantModal = new AddingRestaurantModal();
const header = createHeader({
  title: "점심 뭐 먹니?",
  imageSource: "./add-button.png",
  onButtonClick: () => addingRestaurantModal.toggle(),
});

const restaurantList = document.createElement("ul");
restaurantList.classList.add("restaurant-list");

// 2. 컴포넌트를 결합한다
restaurantList.appendChild(createRestaurantItem());
restaurantList.appendChild(createRestaurantItem());
restaurantList.appendChild(createRestaurantItem());

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
container.appendChild(addingRestaurantModal.element);
container.appendChild(restaurantList);

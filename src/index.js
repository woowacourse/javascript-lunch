import "./resources.js";
import { createHeader } from "./components/Header.ts";
import AddingRestaurantModal from "./components/AddingRestaurantModal.ts";
import { createRestaurantItem } from "./components/ResetaurantItem.ts";
import Modal from "./components/Modal.ts";

// 1. 컴포넌트를 따로 만든다

const addingRestaurantModal = new AddingRestaurantModal();

const restaurantDetailContent = document.createElement("div");
restaurantDetailContent.innerHTML = "<h2>레스토랑 상세 보기</h2>";
const restaurantDetailModal = new Modal({ child: restaurantDetailContent });

const header = createHeader({
  title: "점심 뭐 먹니?",
  imageSource: "./add-button.png",
  onButtonClick: () => addingRestaurantModal.toggle(),
});

const restaurantList = document.createElement("ul");
restaurantList.classList.add("restaurant-list");

// 2. 컴포넌트를 결합한다
restaurantList.appendChild(
  createRestaurantItem({
    restaurant: {
      category: "한식",
      name: "피양콩할머니",
      distance: 8,
      description: "달려가면 8분",
    },
    onClick: () => restaurantDetailModal.toggle(),
  })
);

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
container.appendChild(restaurantList);
container.appendChild(addingRestaurantModal.element);
container.appendChild(restaurantDetailModal.element);
